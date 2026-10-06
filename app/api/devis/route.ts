import { quoteSchema } from "@/lib/quote";
import { getQuoteStorage } from "@/db";

export const dynamic = "force-dynamic";

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Cette demande ne peut pas être traitée depuis cette page." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Le format de la demande est invalide." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 20000) return json({ error: "Votre demande est trop longue." }, 413);
  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 16000) return json({ error: "Votre demande est trop longue." }, 413);
    payload = JSON.parse(body);
  } catch { return json({ error: "La demande est invalide. Vérifiez le formulaire." }, 400); }
  const result = quoteSchema.safeParse(payload);
  if (!result.success) return json({ error: "Vérifiez votre nom, votre e-mail, la prestation et la description (20 caractères minimum), puis acceptez l’utilisation de vos informations." }, 400);
  const value = result.data;
  try {
    const db = getQuoteStorage();
    const previous = await db.prepare("SELECT id FROM quote_requests WHERE id = ?").bind(value.id).first();
    const reference = `GVT-${value.id.substring(0, 8).toUpperCase()}`;
    if (previous) return json({ success: true, reference });
    const ip = request.headers.get("cf-connecting-ip");
    const fingerprintSource = ip ? `gravity:${ip}` : `gravity:${value.email.toLowerCase()}`;
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(fingerprintSource));
    const fingerprint = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
    const recent = await db.prepare("SELECT COUNT(*) AS total FROM quote_requests WHERE request_fingerprint = ? AND created_at >= ?").bind(fingerprint, Date.now() - 600000).first<{ total: number }>();
    if ((recent?.total || 0) >= 4) return json({ error: "Plusieurs demandes ont déjà été reçues. Patientez quelques minutes avant de réessayer." }, 429);
    await db.prepare("INSERT INTO quote_requests (id, name, email, company, phone, service, budget, description, consent, request_fingerprint, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING").bind(value.id, value.name, value.email.toLowerCase(), value.company, value.phone, value.service, value.budget, value.description, 1, fingerprint, Date.now()).run();
    return json({ success: true, reference }, 201);
  } catch {
    console.error("quote_save_failed: storage unavailable");
    return json({ error: "Votre demande n’a pas pu être enregistrée pour le moment. Vos informations restent dans le formulaire ; réessayez dans un instant." }, 503);
  }
}
