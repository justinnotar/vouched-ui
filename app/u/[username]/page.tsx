import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { MapPin, Pencil, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileReferralCard } from "@/components/profile-referral-card";
import { ProfileSharingBadge } from "@/components/profile-sharing-badge";
import { VouchCard } from "@/components/vouch-card";
import { getCategoryMeta, getUserByUsername, getVouchesByAuthor, type Category } from "@/lib/mock-data";

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
  const trustedPeople = Array.from(
    vouches.reduce<Map<string, (typeof vouches)[number]>>((acc, vouch) => {
      if (!acc.has(vouch.recipientName)) {
        acc.set(vouch.recipientName, vouch);
      }
      return acc;
    }, new Map()).values()
  ).slice(0, 4);

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
        <div className="flex flex-col gap-6">
          <Card className="w-full overflow-hidden">
            <CardContent className="p-0">
              <div className="border border-[#111827]/10 bg-[#fffdf9] p-8 text-[#111827] shadow-[0_16px_40px_rgba(17,24,39,0.06)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={user.avatarUrl} alt={`${user.name} avatar`} className="h-16 w-16 rounded-full border-2 border-[#3b82f6]/20 object-cover" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-[#3b82f6]">Public profile</p>
                      <h1 className="text-3xl font-semibold">{user.name}</h1>
                      <p className="mt-2 text-sm text-slate-600">{user.location}</p>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="icon" className="rounded-full border border-[#111827]/10 bg-white/80 shadow-sm hover:bg-white" aria-label="Edit profile">
                    <Link href="/dashboard">
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600">{user.bio}</p>
                {trustedPeople.length > 0 ? (
                  <div className="mt-6 rounded-[24px] border border-[#c85b3f]/15 bg-[#fff7f2] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">🤝 Who I trust</p>
                      <p className="text-sm text-slate-500">{vouches.length} shared vouches</p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {trustedPeople.map((vouch) => {
                        const categoryMeta = getCategoryMeta(vouch.category);
                        return (
                          <div key={`${vouch.recipientName}-${vouch.recipientBusiness}`} className="grid h-full min-h-[80px] w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-[22px] border border-[#111827]/10 bg-white p-4 text-left shadow-sm sm:flex sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-900">{vouch.recipientName}</p>
                              <p className="text-xs text-slate-500">{categoryMeta.icon} {vouch.recipientBusiness}</p>
                            </div>
                            <div className="flex flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">
                              {vouch.recipientPhone ? (
                                <a href={`tel:${vouch.recipientPhone}`} className="inline-flex min-w-[112px] items-center justify-center rounded-full bg-[#111827] px-3 py-2 text-[12px] font-semibold text-[#fffdf9] transition hover:bg-[#1f2937]">
                                  Call
                                </a>
                              ) : null}
                              {vouch.recipientWebsite ? (
                                <a href={vouch.recipientWebsite} target="_blank" rel="noreferrer" className="inline-flex min-w-[112px] items-center justify-center rounded-full border border-[#111827]/12 bg-[#f8f2e8] px-3 py-2 text-[12px] font-semibold text-[#111827] transition hover:bg-[#efe4d3]">
                                  Visit website
                                </a>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <div className="flex w-full justify-end">
            <ProfileReferralCard user={user} />
          </div>
        </div>

        <section aria-labelledby="vouches-heading">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="vouches-heading" className="text-2xl font-semibold text-slate-900">💬 Vouches</h2>
            <ProfileSharingBadge user={user} />
          </div>

          {vouches.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-start gap-3 py-10">
                <p className="text-lg font-semibold text-slate-900">This profile has no vouches yet.</p>
                <p className="text-sm leading-6 text-slate-600">When this person adds vouches, they will appear here as a living record of trust.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
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

              <div className="grid gap-3 sm:grid-cols-3">
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
            </div>
          )}
        </section>
      </section>
    </>
  );
}
