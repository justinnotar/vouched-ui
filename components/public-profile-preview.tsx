"use client";

import Link from "next/link";
import { useAuthState } from "@/components/auth-state-provider";
import { getCategoryMeta, getVouchesByAuthor } from "@/lib/mock-data";

export function PublicProfilePreview() {
  const { user, isSignedIn } = useAuthState();

  if (!isSignedIn || !user) {
    return (
      <div className="rounded-[28px] border border-[#111827]/10 bg-[#fffdf9] p-6 text-[#334155] shadow-[0_12px_30px_rgba(17,24,39,0.06)]">
        <p className="text-sm uppercase tracking-[0.24em] text-[#c85b3f]">Public profile preview</p>
        <h2 className="mt-3 text-2xl font-semibold text-[#111827]" style={{ fontFamily: "var(--font-fraunces)" }}>
          Create your own Vouched page
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#64748b]">
          Sign up to publish a shareable profile of the people you trust and the recommendations you want to remember.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/sign-up" className="inline-flex items-center justify-center rounded-full bg-[#c85b3f] px-4 py-2 text-sm font-semibold text-[#fffdf9] transition hover:bg-[#a9472d]">
            Sign up
          </Link>
          <Link href="/explore" className="inline-flex items-center justify-center rounded-full border border-[#111827]/12 bg-[#f8f2e8] px-4 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#efe4d3]">
            Explore examples
          </Link>
        </div>
      </div>
    );
  }

  const vouches = getVouchesByAuthor(user.id).slice(0,2);

  return (
    <div className="rounded-[28px] border border-[#111827]/10 bg-[#fffdf9] p-5 text-[#334155] shadow-[0_12px_30px_rgba(17,24,39,0.06)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#c85b3f]">Public profile preview</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#111827]" style={{ fontFamily: "var(--font-fraunces)" }}>
            {user.name}
          </h2>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <img src={user.avatarUrl} alt={`${user.name} avatar`} className="h-12 w-12 rounded-full border border-[#111827]/10 object-cover" />
        <div>
          <p className="font-medium text-[#111827]">{user.location}</p>
          <p className="text-sm text-[#64748b]">{user.bio}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {vouches.map((vouch) => {
          const categoryMeta = getCategoryMeta(vouch.category);
          return (
            <div key={vouch.id} className="rounded-[20px] border border-[#111827]/10 bg-[#f8f2e8] p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{vouch.recipientName}</p>
                  <p className="text-sm text-[#64748b]">{vouch.recipientBusiness}</p>
                </div>
                <span className="rounded-full bg-[#c85b3f] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#fffdf9]">
                  {categoryMeta.icon} {categoryMeta.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
