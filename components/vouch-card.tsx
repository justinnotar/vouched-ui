"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BadgeCheck, Heart, MapPin } from "lucide-react";
import type { User, Vouch } from "@/lib/mock-data";
import { getCategoryMeta } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/components/auth-state-provider";

interface VouchCardProps {
  vouch: Vouch;
  author: User;
  compact?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? "text-[#c85b3f]" : "text-[#e4d7c3]"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function VouchCard({ vouch, author, compact = false }: VouchCardProps) {
  const router = useRouter();
  const { user } = useAuthState();
  const categoryMeta = useMemo(() => getCategoryMeta(vouch.category), [vouch.category]);
  const [likeCount, setLikeCount] = useState(vouch.likeCount);
  const [hasLiked, setHasLiked] = useState(false);

  const currentUserId = user?.id;
  const isOwnProfile = Boolean(currentUserId && author.id === currentUserId);

  const handleLike = () => {
    if (!currentUserId) {
      router.push("/sign-in");
      return;
    }

    setLikeCount((count) => count + (hasLiked ? -1 : 1));
    setHasLiked((current) => !current);
  };

  return (
    <article className="stamp group rounded-[28px] border border-[#111827]/10 bg-[#fffdf9] p-5 shadow-[0_12px_30px_rgba(17,24,39,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(17,24,39,0.08)] motion-reduce:transition-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[#111827]" style={{ fontFamily: "var(--font-fraunces)" }}>
              {vouch.recipientName}
            </h3>
            {vouch.featuredOrder ? <BadgeCheck className="h-4 w-4 text-[#c85b3f]" /> : null}
          </div>
          <p className="text-sm text-[#64748b]">{categoryMeta.icon} {vouch.recipientBusiness}</p>
        </div>
        <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]", categoryMeta.soft, categoryMeta.accent)}>
          {categoryMeta.icon} {categoryMeta.label}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#64748b]">
        <div className="flex items-center gap-2 rounded-full bg-[#f6e3da] px-3 py-1">
          <StarRating rating={vouch.rating} />
        </div>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {author.location}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[#334155]">{vouch.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {vouch.recipientPhone ? (
          <a href={`tel:${vouch.recipientPhone}`} className="inline-flex items-center rounded-full bg-[#111827] px-3 py-2 text-xs font-semibold text-[#fffdf9] transition hover:bg-[#1f2937]">
            Call
          </a>
        ) : null}
        {vouch.recipientWebsite ? (
          <a href={vouch.recipientWebsite} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-[#111827]/12 bg-[#f8f2e8] px-3 py-2 text-xs font-semibold text-[#111827] transition hover:bg-[#efe4d3]">
            Visit website
          </a>
        ) : null}
        {!isOwnProfile ? (
          <Button variant="secondary" className="rounded-full px-3 py-2 text-xs" onClick={handleLike}>
            <Heart className={cn("mr-2 h-4 w-4 transition", hasLiked && "fill-current text-rose-500")} />
            {hasLiked ? "You +1'd this" : "+1 I’ve used them too"}
          </Button>
        ) : null}
        {!compact ? (
          <Link href={`/u/${author.username}`} className="text-sm font-semibold text-[#c85b3f] transition hover:text-[#a9472d]">
            View profile
          </Link>
        ) : null}
      </div>

      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#64748b]">
        <span className="font-semibold text-[#111827]">{author.name}</span> and {likeCount} others vouch for {vouch.recipientName.split(" ")[0]}
      </p>
    </article>
  );
}
