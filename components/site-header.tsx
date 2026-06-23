"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";
import { useAuthState } from "@/components/auth-state-provider";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { user, isSignedIn, signOut } = useAuthState();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="border-b border-[#111827]/8 bg-[#f8f2e8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-[#111827]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111827]/10 bg-[#111827] text-sm font-semibold tracking-[0.2em] text-[#fffdf9]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="flex flex-col">
            <span style={{ fontFamily: "var(--font-fraunces)" }} className="text-[1.5rem] leading-none">
              Vouched
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-[#475569] md:flex">
          <Button asChild className="rounded-full px-3 text-xs sm:px-4">
            <Link href="/explore">Find a provider</Link>
          </Button>
          <Link
            href="/explore"
            className={`rounded-full px-3 py-2 transition ${isActive("/explore") ? "bg-[#111827] text-[#fffdf9]" : "hover:text-[#111827]"}`}
          >
            Explore
          </Link>
          <Link
            href="/feed"
            className={`rounded-full px-3 py-2 transition ${isActive("/feed") ? "bg-[#111827] text-[#fffdf9]" : "hover:text-[#111827]"}`}
          >
            Feed
          </Link>
          <Link
            href="/requests"
            className={`rounded-full px-3 py-2 transition ${isActive("/requests") ? "bg-[#111827] text-[#fffdf9]" : "hover:text-[#111827]"}`}
          >
            Requests
          </Link>
          <Link
            href="/dashboard"
            className={`rounded-full px-3 py-2 transition ${isActive("/dashboard") ? "bg-[#111827] text-[#fffdf9]" : "hover:text-[#111827]"}`}
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isSignedIn && user ? (
            <>
              <Button variant="secondary" className="hidden rounded-full px-3 text-xs sm:inline-flex" onClick={signOut}>
                Sign out
              </Button>
              <Button asChild className="rounded-full px-3 text-xs">
                <Link href={`/u/${user.username}`}>My profile</Link>
              </Button>
            </>
          ) : (
            <Button asChild className="rounded-full px-3 text-xs">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isSignedIn && user ? (
        <div className="border-t border-[#111827]/8 bg-[#f4ebdc] px-4 py-2 text-center text-sm text-[#475569] sm:px-6 lg:px-8">
          <span className="font-semibold text-[#111827]">Signed in as {user.name}</span> · <Link href="/sign-in" className="text-[#c85b3f] hover:underline">Switch profile</Link>
        </div>
      ) : null}
    </header>
  );
}
