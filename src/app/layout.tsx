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
  title: 'Котёл с бункером купить — пеллетные, твердотопливные, автоматические | Теплоэнергетика',
  description: 'Котлы с бункером длительного горения на пеллетах. Котел пеллетный автоматический с бункером цена. Котлы с низким бункером и верхним из Красноярска.',
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
    title: `${SITE_NAME} — котлы с бункером: купить пеллетные и твердотопливные`,
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
      <head>
        <meta name="yandex-verification" content="I5ANRZVl28oDZQnDul70iTL46y4O_qh0h7bWIG_VJpI" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112455472', 'ym');

    ym(112455472, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/112455472" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </head>
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