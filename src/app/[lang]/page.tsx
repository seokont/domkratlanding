import { notFound } from "next/navigation";
import { getDictionary, hasLocale, localeTags } from "@/i18n/config";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Depth, Features, Hero, Pains, Process } from "@/components/sections/TopSections";
import {
  Audience,
  ClientPage,
  Integrations,
  MobileApp,
  Numbers,
  Pilot,
  Security,
} from "@/components/sections/MiddleSections";
import { Pricing } from "@/components/sections/Pricing";
import { Faq, FinalCta, Footer, Migration } from "@/components/sections/BottomSections";

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.brand,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      description: d.meta.description,
      inLanguage: localeTags[lang],
      url: `${site.url}/${lang}/`,
      offers: {
        "@type": "Offer",
        description: d.hero.ctaPrimary,
        price: "0",
        priceCurrency: d.pricing.currency,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: localeTags[lang],
      mainEntity: d.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header nav={d.nav} lang={lang} brand={site.brand} appUrl={site.appUrl} />
      <main id="main">
        <Hero t={d.hero} m={d.mock} />
        <Pains t={d.pains} />
        <Process t={d.process} />
        <Depth t={d.depth} />
        <Features t={d.features} />
        <Numbers t={d.numbers} demo={d.mock.demoData} />
        <ClientPage t={d.clientPage} />
        <MobileApp t={d.mobile} />
        <Audience t={d.audience} />
        <Pricing t={d.pricing} />
        <Migration t={d.migration} brand={site.brand} />
        <Pilot t={d.pilot} />
        <Integrations t={d.integrations} />
        <Security t={d.security} />
        <Faq t={d.faq} />
        <FinalCta t={d.finalCta} lang={lang} />
      </main>
      <Footer t={d.footer} nav={d.nav} lang={lang} />
    </>
  );
}
