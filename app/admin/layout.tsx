import type { Metadata, Viewport } from "next";
import "../globals.css";
import { cormorant, manrope, tenor } from "@/lib/fonts";

export const metadata: Metadata = {
  title: { default: "Admin · Ordine Ermetico", template: "%s · Admin · Ordine Ermetico" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#111111", width: "device-width", initialScale: 1 };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${tenor.variable} ${manrope.variable}`}>
      <body className="bg-oe-ivory">{children}</body>
    </html>
  );
}
