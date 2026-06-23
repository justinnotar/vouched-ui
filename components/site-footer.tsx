import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#111827]/8 bg-[#f8f2e8]/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#64748b] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>Vouched makes personal recommendations easy to keep, share, and trust.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/explore" className="transition hover:text-[#111827]">Explore</Link>
          <Link href="/sign-in" className="transition hover:text-[#111827]">Sign in</Link>
          <Link href="/dashboard" className="transition hover:text-[#111827]">Dashboard</Link>
        </div>
      </div>
    </footer>
  );
}
