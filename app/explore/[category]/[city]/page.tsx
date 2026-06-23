import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Compass, Phone, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryMeta, getExploreResults, MOCK_USERS, type Category } from "@/lib/mock-data";

interface LeaderboardPageProps {
  params: Promise<{ category: string; city: string }>;
}

export async function generateMetadata({ params }: LeaderboardPageProps) {
  const { category, city } = await params;
  return {
    title: `${category} leaders in ${city} · Vouched`,
    description: `A mock leaderboard of the most-vouched ${category} providers in ${city}.`,
  };
}

export default async function LeaderboardPage({ params }: LeaderboardPageProps) {
  const { category, city } = await params;
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const categoryMeta = getCategoryMeta(normalizedCategory as Category);

  const results = getExploreResults(normalizedCategory as Category, decodeURIComponent(city).replace(/-/g, " "));

  if (!results.length) {
    notFound();
  }

  return (
    <>
      <Script
        id="leaderboard-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${normalizedCategory} leaders in ${decodeURIComponent(city).replace(/-/g, " ")}`,
            itemListElement: results.slice(0, 6).map((result, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: result.recipientName,
              description: result.recipientBusiness,
            })),
          }),
        }}
      />
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">Leaderboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Top {categoryMeta.icon} {categoryMeta.label} providers in {decodeURIComponent(city).replace(/-/g, " ")}</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((result) => {
            const author = MOCK_USERS.find((user) => user.id === result.authorId);
            return (
              <Card key={result.id}>
                <CardHeader>
                  <CardTitle>{result.recipientName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">{result.recipientBusiness}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Compass className="h-4 w-4 text-[#3b82f6]" />
                    <span>{author?.location}</span>
                  </div>
                  <p className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{categoryMeta.icon} {categoryMeta.label}</p>
                  <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{result.likeCount} vouches · {result.rating}★</p>
                  <div className="flex flex-wrap gap-2">
                    {result.recipientPhone ? (
                      <a href={`tel:${result.recipientPhone}`} className="inline-flex items-center rounded-full bg-[#3b82f6] px-3 py-2 text-xs font-semibold text-white">
                        <Phone className="mr-2 h-3.5 w-3.5" />
                        Contact now
                      </a>
                    ) : null}
                    <Link href={`/u/${author?.username ?? "justin"}`} className="inline-flex items-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-[#3b82f6] hover:text-[#3b82f6]">
                      <Sparkles className="mr-2 h-3.5 w-3.5" />
                      View profile
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
