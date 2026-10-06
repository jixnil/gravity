import { z } from "zod";

export const serviceOptions = [
  { value: "site-web", label: "Site web" },
  { value: "application-mobile", label: "Application mobile" },
  { value: "application-web", label: "Application métier / web" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "automatisation", label: "Automatisation & IA" },
  { value: "maintenance", label: "Maintenance & évolution" },
  { value: "autre", label: "Autre / à définir" },
] as const;

export const quoteSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).default(""),
  phone: z.string().trim().max(30).default(""),
  service: z.enum(["site-web", "application-mobile", "application-web", "e-commerce", "automatisation", "maintenance", "autre"]),
  budget: z.enum(["a-definir", "budget-prevu"]),
  description: z.string().trim().min(20).max(4000),
  consent: z.literal(true),
  website: z.string().max(0).default(""),
});
