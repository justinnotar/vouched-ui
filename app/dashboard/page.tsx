"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Copy, Plus, Sparkles, Upload, EyeOff, GripVertical } from "lucide-react";
import { useAuthState } from "@/components/auth-state-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VouchCard } from "@/components/vouch-card";
import { addVouch, getVouchesByAuthor, MOCK_USERS, MOCK_VOUCHES, type User, type Vouch, type Category } from "@/lib/mock-data";

const categoryOptions: Category[] = ["Plumber", "Electrician", "Accountant", "Lawyer", "Dentist", "Doctor", "Contractor", "IT", "Realtor", "Landscaper", "Cleaner", "Mechanic", "Trainer", "Tutor", "Chef", "Other"];

function getInitialVouches() {
  return getVouchesByAuthor("user-justin").map((vouch) => ({ ...vouch }));
}

export default function DashboardPage() {
  const { user, isSignedIn } = useAuthState();
  const [vouches, setVouches] = useState<Vouch[]>(() => getInitialVouches());
  const [profile, setProfile] = useState<User | null>(user);
  const [copied, setCopied] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [sharePromptOpen, setSharePromptOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientBusiness, setRecipientBusiness] = useState("");
  const [category, setCategory] = useState<Category>("Plumber");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");

  const profileLink = useMemo(() => `https://vouched.example/u/${profile?.username ?? "your-name"}`, [profile?.username]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCreateVouch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile || !recipientName.trim() || !recipientBusiness.trim() || !description.trim()) {
      return;
    }

    const created = addVouch({
      authorId: profile.id,
      recipientName: recipientName.trim(),
      recipientBusiness: recipientBusiness.trim(),
      category,
      description: description.trim(),
      rating,
      recipientPhone: phone.trim() || undefined,
      recipientWebsite: website.trim() || undefined,
      recipientInstagram: instagram.trim() || undefined,
    });

    setVouches((current) => [created, ...current]);
    setRecipientName("");
    setRecipientBusiness("");
    setCategory("Plumber");
    setDescription("");
    setRating(5);
    setPhone("");
    setWebsite("");
    setInstagram("");
    setIsComposerOpen(false);
    setShareLink(profileLink);
    setSharePromptOpen(true);
  };

  const handleShareCopy = async () => {
    if (!shareLink) {
      return;
    }

    await navigator.clipboard.writeText(shareLink);
    setSharePromptOpen(false);
  };

  const handleShareToTwitter = () => {
    if (!shareLink) {
      return;
    }

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my Vouched page: ${shareLink}`)}`, "_blank", "noopener,noreferrer");
  };

  const handleShareToSms = () => {
    if (!shareLink) {
      return;
    }

    window.location.href = `sms:&body=${encodeURIComponent(`Check out my Vouched page: ${shareLink}`)}`;
  };

  if (!isSignedIn || !user) {
    return (
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="flex flex-col gap-4 py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-900">Sign in to manage your Vouched page.</h1>
            <p className="text-sm leading-7 text-slate-600">This demo keeps everything local so you can shape the experience before real auth and persistence are added.</p>
            <Button asChild className="w-fit rounded-full">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Dialog open={isComposerOpen} onOpenChange={setIsComposerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="text-xl font-semibold text-slate-900">Add a new vouch</DialogTitle>
          <form className="mt-4 space-y-4" onSubmit={handleCreateVouch}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Recipient name
                <input value={recipientName} onChange={(event) => setRecipientName(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" required />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Business
                <input value={recipientBusiness} onChange={(event) => setRecipientBusiness(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" required />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Category
                <select value={category} onChange={(event) => setCategory(event.target.value as Category)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Rating
                <select value={rating} onChange={(event) => setRating(Number(event.target.value) as 1 | 2 | 3 | 4 | 5)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>{value} star{value === 1 ? "" : "s"}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Why you trust them
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" required />
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm font-medium text-slate-700">
                Phone
                <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Website
                <input value={website} onChange={(event) => setWebsite(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Instagram
                <input value={instagram} onChange={(event) => setInstagram(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" className="rounded-full" onClick={() => setIsComposerOpen(false)}>Cancel</Button>
              <Button type="submit" className="rounded-full">Save vouch</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {sharePromptOpen ? (
        <Card className="border-[#3b82f6]/20 bg-blue-50/60">
          <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-900">Share this page with someone who needs this.</p>
              <p className="mt-1 text-sm text-slate-600">Your new vouch is live. Send the link to help someone find the right person faster.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" className="rounded-full" onClick={handleShareCopy}>Copy link</Button>
              <Button variant="secondary" className="rounded-full" onClick={handleShareToTwitter}>Share to X</Button>
              <Button className="rounded-full" onClick={handleShareToSms}>Text it</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>My Vouched</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCopy} className="rounded-full">
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied" : "Copy my Vouched link"}
              </Button>
              <Button variant="secondary" className="rounded-full" onClick={() => setIsComposerOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add a vouch
              </Button>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Shareable link</p>
              <p className="mt-1 break-all">{profileLink}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Username
              <input value={profile?.username ?? ""} onChange={(event) => setProfile((current) => current ? ({ ...current, username: event.target.value }) : current)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Bio
              <textarea value={profile?.bio ?? ""} onChange={(event) => setProfile((current) => current ? ({ ...current, bio: event.target.value }) : current)} className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Location
              <input value={profile?.location ?? ""} onChange={(event) => setProfile((current) => current ? ({ ...current, location: event.target.value }) : current)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <Upload className="h-4 w-4 text-[#3b82f6]" />
              Upload avatar preview
              <input type="file" className="hidden" />
            </label>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Your vouches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vouches.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">Add your first trusted recommendation to create momentum.</div>
            ) : (
              vouches.map((vouch, index) => (
                <div key={vouch.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="mt-1 text-slate-400"><GripVertical className="h-4 w-4" /></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{vouch.recipientName}</p>
                    <p className="text-sm text-slate-600">{vouch.recipientBusiness}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" className="rounded-full px-3 text-xs">Edit</Button>
                    <Button variant="ghost" className="rounded-full px-3 text-xs"><EyeOff className="mr-1 h-3.5 w-3.5" />Hide</Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured & Verified</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Featured badge</p>
                <p className="mt-1">Display a premium badge on your profile and unlock promoted placement.</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#3b82f6] px-3 py-1 text-xs font-semibold text-white"><Sparkles className="h-3.5 w-3.5" />Featured</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Vouched Verified</p>
                <p className="mt-1">A visual-only upsell for a future badge and trust layer.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pro upgrade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>Claimed business profiles can unlock advanced promotion tools and analytics.</p>
              <Button variant="secondary" className="w-full rounded-full" disabled>Upgrade · Coming soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
