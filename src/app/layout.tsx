import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RMIS - Risk Management Information System",
  description: "Sistem Informasi Manajemen Risiko - Kementerian PUPR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-pu-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
