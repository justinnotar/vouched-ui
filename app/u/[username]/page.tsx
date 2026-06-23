import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VouchCard } from "@/components/vouch-card";
import { getCategoryMeta, getUserByUsername, getVouchesByAuthor, MOCK_CURRENT_USER, type Category } from "@/lib/mock-data";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const user = getUserByUsername(username);

  if (!user) {
    return { title: "User not found · Vouched" };
  }

  return {
    title: `${user.name} · Vouched`,
    description: `${user.name} shares vouches on Vouched. Explore their public vouches and discover people they trust.`,
    openGraph: {
      title: `${user.name} · Vouched`,
      description: `Vouches from ${user.name} on Vouched.`,
      type: "profile",
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const vouches = getVouchesByAuthor(user.id);
  const grouped = vouches.reduce<Record<string, typeof vouches>>((acc, vouch) => {
    const key = vouch.category;
    acc[key] = [...(acc[key] ?? []), vouch];
    return acc;
  }, {});

  return (
    <>
      <Script
        id="profile-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: user.name,
            description: user.bio,
            url: `https://vouched.example/u/${user.username}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: user.location,
            },
            sameAs: [`https://vouched.example/u/${user.username}`],
          }),
        }}
      />
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border border-[#111827]/10 bg-[#fffdf9] p-8 text-[#111827] shadow-[0_16px_40px_rgba(17,24,39,0.06)]">
                <div className="flex items-center gap-4">
                  <img src={user.avatarUrl} alt={`${user.name} avatar`} className="h-16 w-16 rounded-full border-2 border-[#3b82f6]/20 object-cover" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#3b82f6]">Public profile</p>
                    <h1 className="text-3xl font-semibold">{user.name}</h1>
                    <p className="mt-2 text-sm text-slate-600">{user.location}</p>
                  </div>
                </div>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600">{user.bio}</p>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Vouches shared</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{vouches.length}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Categories</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{Object.keys(grouped).length}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Joined</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need a trusted referral?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-slate-600">Ask {user.name} for a personalized vouch and make the next step feel immediate.</p>
              <Button asChild className="w-full rounded-full">
                <Link href={`/requests?target=${user.username}`}>Ask for a referral</Link>
              </Button>
              <Link href="/sign-up" className="inline-flex text-sm font-semibold text-[#3b82f6] hover:underline">
                Create your own Vouched page
              </Link>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">A fast, shareable page for the people you trust.</p>
                <p className="mt-1">Your own Vouched page makes it easy to share your vouches.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section aria-labelledby="vouches-heading">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="vouches-heading" className="text-2xl font-semibold text-slate-900">Vouches</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Sparkles className="h-4 w-4 text-[#3b82f6]" />
              Publicly shared by {user.name}
            </div>
          </div>

          {vouches.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-start gap-3 py-10">
                <p className="text-lg font-semibold text-slate-900">This profile has no vouches yet.</p>
                <p className="text-sm leading-6 text-slate-600">When this person adds vouches, they will appear here as a living record of trust.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {Object.entries(grouped).map(([category, categoryVouches]) => {
                const categoryMeta = getCategoryMeta(category as Category);
                return (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{categoryMeta.icon} {categoryMeta.label}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{categoryVouches.length}</span>
                    </div>
                    {categoryVouches.map((vouch) => (
                      <VouchCard key={vouch.id} vouch={vouch} author={user} />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </>
  );
}
