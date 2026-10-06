import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRAVITY — Vos idées. Notre énergie. Du concret.",
  description: "GRAVITY, collectif de développeurs à Madagascar. Sites web, applications mobiles, e-commerce et automatisation. Découvrez nos services et demandez votre devis.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
