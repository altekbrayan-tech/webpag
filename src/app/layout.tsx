import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clouddec | Transformamos tu negocio con tecnología",
  description: "Desarrollo de software personalizado, soluciones IT integrales y soporte técnico especializado para llevar tu empresa al siguiente nivel.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px - 300px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
