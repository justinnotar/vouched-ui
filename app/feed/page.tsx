"use client";

import Link from "next/link";
import { useAuthState } from "@/components/auth-state-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VouchCard } from "@/components/vouch-card";
import { getFeedVouches, getUserByUsername, MOCK_USERS } from "@/lib/mock-data";

export default function FeedPage() {
  const { user, isSignedIn } = useAuthState();

  if (!isSignedIn || !user) {
    return (
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="flex flex-col gap-4 py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">Feed</p>
            <h1 className="text-3xl font-semibold text-slate-900">Your feed is waiting.</h1>
            <p className="text-sm leading-7 text-slate-600">Sign in and follow trusted people to see their latest vouches in a chronological stream.</p>
            <Button asChild className="w-fit rounded-full">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const feedVouches = getFeedVouches(user.id);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">Feed</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Recent vouches from people you follow.</h1>
      </div>

      {feedVouches.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-sm leading-7 text-slate-600">Follow a few people to start building a helpful stream of vouches.</CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {feedVouches.map((vouch) => {
            const author = getUserByUsername(MOCK_USERS.find((entry) => entry.id === vouch.authorId)?.username ?? "") ?? MOCK_USERS[0];
            return <VouchCard key={vouch.id} vouch={vouch} author={author} />;
          })}
        </div>
      )}
    </section>
  );
}
