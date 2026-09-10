import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import "@/styles/style.css";
import "@/styles/h.css";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, ORG_ADDRESS, ORG_PHONE, ORG_EMAIL } from "@/data/seo";

const ogImage = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — твёрдотопливные и пеллетные котлы`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  verification: {
    yandex: '923e9952fb11296f',
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — твёрдотопливные и пеллетные котлы`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 1200,
      height: 630,
    },
    address: { "@type": "PostalAddress", streetAddress: "ул. Гостевая, 3, офис 103", addressLocality: "Челябинск", addressRegion: "Челябинская область", postalCode: "454902", addressCountry: "RU" },
    contactPoint: [
      { "@type": "ContactPoint", telephone: ORG_PHONE, email: ORG_EMAIL, contactType: "sales", availableLanguage: "Russian" },
      { "@type": "ContactPoint", telephone: "+7 (982) 324-95-25", contactType: "customer service", availableLanguage: "Russian" },
    ],
    sameAs: [],
  };

  return (
    <html lang="ru">
      <body className="dark-mode" id="mainBody">
        <Header />
        {children}
        <Footer />
        <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <Script src="/scripts/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}