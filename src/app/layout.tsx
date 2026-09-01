import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import "@/styles/style.css";
import "@/styles/h.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Теплоэнергетика — твёрдотопливные и пеллетные котлы",
  description: "Твёрдотопливные, пеллетные и автоматические котлы Вулкан.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="dark-mode" id="mainBody">
        <Header />
        {children}
        <Footer />
        <Script src="/scripts/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}