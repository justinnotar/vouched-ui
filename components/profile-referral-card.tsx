"use client";

import Link from "next/link";
import { useAuthState } from "@/components/auth-state-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/lib/mock-data";

interface ProfileReferralCardProps {
  user: User;
}

export function ProfileReferralCard({ user }: ProfileReferralCardProps) {
  const { user: authUser } = useAuthState();
  const isOwnProfile = Boolean(authUser && authUser.id === user.id);

  if (isOwnProfile) {
    return null;
  }

  return (
    <Card className="w-full">
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
  );
}
