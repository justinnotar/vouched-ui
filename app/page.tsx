import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicProfilePreview } from "@/components/public-profile-preview";
import { VouchCard } from "@/components/vouch-card";
import { getVouchesByAuthor, MOCK_CURRENT_USER } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Vouched · Vouches, made shareable",
  description: "Vouched is a social trust network where people share personal vouches for the people they trust most.",
  openGraph: {
    title: "Vouched · Vouches, made shareable",
    description: "A personal vouch page for everyday trust.",
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is Vouched?",
    answer: "Vouched is a personal page where people share the trusted service providers they actually use and would happily recommend.",
  },
  {
    question: "How is Vouched different from Yelp or Google reviews?",
    answer: "Vouched focuses on personal trust, not anonymous ratings. It is a living record of the people you know and recommend.",
  },
  {
    question: "Can I use Vouched for local services?",
    answer: "Yes. People use Vouched for plumbers, dentists, realtors, accountants, IT help, and many other specialists.",
  },
];

export default function HomePage() {
  const profileUser = MOCK_CURRENT_USER;
  const vouches = getVouchesByAuthor(profileUser.id).slice(0, 2);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 rounded-[36px] border border-[#111827]/10 bg-[#fffdf9] p-6 shadow-[0_16px_40px_rgba(17,24,39,0.06)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center rounded-full border border-[#111827]/10 bg-[#f6e3da] px-3 py-1 text-sm font-medium text-[#c85b3f]">
              <Sparkles className="mr-2 h-4 w-4" />
              A personal recommendation page for everyday trust
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#111827] sm:text-5xl" style={{ fontFamily: "var(--font-fraunces)" }}>
              One link for the people you’d happily send a friend to.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#475569]">
              Vouched turns word-of-mouth into a shareable record that feels considered, useful, and unmistakably yours.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-full px-5 py-3">
                <Link href="/explore">
                  Browse trusted providers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link href="/sign-up" className="text-sm font-semibold text-[#c85b3f] transition hover:text-[#a9472d]">
                Create your own Vouched page
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#64748b]">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#c85b3f]" /> Personal proof, not anonymous noise</span>
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#c85b3f]" /> Ready for the next referral</span>
            </div>
          </div>

          <PublicProfilePreview />
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col gap-3 py-6">
              <p className="text-4xl font-semibold text-[#111827]">10k+</p>
              <p className="text-sm text-[#64748b]">Recommendations shared this month.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-3 py-6">
              <p className="text-4xl font-semibold text-[#111827]">3 steps</p>
              <p className="text-sm text-[#64748b]">From a quick recommendation to a profile you can share instantly.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-3 py-6">
              <p className="text-4xl font-semibold text-[#111827]">100%</p>
              <p className="text-sm text-[#64748b]">Built to feel alive now with typed mock data and a clear point of view.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85b3f]">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#111827]" style={{ fontFamily: "var(--font-fraunces)" }}>
              Three simple steps to make trust portable.
            </h2>
            <div className="mt-6 space-y-4">
              {[
                { title: "Leave one clear recommendation", text: "Add the person you trust and say why they are worth remembering." },
                { title: "Send your Vouched link", text: "Pass one page to friends, family, or future clients." },
                { title: "Let the list grow naturally", text: "Every new favor, fix, or referral becomes a public proof point." },
              ].map((step, index) => (
                <div key={step.title} className="flex gap-3 rounded-[20px] border border-[#111827]/10 bg-[#fffdf9] p-4 shadow-[0_8px_20px_rgba(17,24,39,0.04)]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-[#fffdf9]">{index + 1}</div>
                  <div>
                    <p className="font-semibold text-[#111827]">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#64748b]">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {vouches.map((vouch) => (
              <VouchCard key={vouch.id} vouch={vouch} author={profileUser} compact />
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#111827]/10 bg-[#fffdf9] p-6 shadow-[0_16px_40px_rgba(17,24,39,0.06)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85b3f]">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#111827]" style={{ fontFamily: "var(--font-fraunces)" }}>
              Questions people ask about Vouched
            </h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {faqItems.map((item) => (
              <Card key={item.question}>
                <CardHeader>
                  <CardTitle>{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-[#64748b]">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
