"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Compass, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryMeta, getExploreResults, MOCK_USERS, type Category } from "@/lib/mock-data";

const categories: Category[] = ["Plumber", "Electrician", "Accountant", "Lawyer", "Dentist", "Doctor", "Contractor", "IT", "Realtor", "Landscaper", "Cleaner", "Mechanic", "Trainer", "Tutor", "Chef", "Other"];

export default function ExplorePage() {
  const [category, setCategory] = useState<Category | "">("");
  const [location, setLocation] = useState("Austin");
  const [activeCategory, setActiveCategory] = useState<Category | "">("");

  const results = useMemo(() => getExploreResults(activeCategory || category || undefined, location || undefined), [activeCategory, category, location]);

  const handleCategorySelect = (nextCategory: Category | "") => {
    setActiveCategory(nextCategory);
    setCategory(nextCategory);
  };

  const handleUseMyLocation = () => {
    setLocation("Austin");
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">Explore</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Find trusted people by category and city.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">Jump to the most common needs, or use the quick location shortcut when you&apos;re looking for someone nearby.</p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap gap-2">
            {(["Plumber", "Electrician", "Accountant", "Dentist", "Mechanic"] as Category[]).map((entry) => {
              const categoryMeta = getCategoryMeta(entry);
              return (
                <button key={entry} type="button" onClick={() => handleCategorySelect(entry)} className={`rounded-full px-3 py-2 text-sm font-medium ${activeCategory === entry ? "bg-[#3b82f6] text-white" : "bg-slate-100 text-slate-700"}`}>
                  {categoryMeta.icon} {entry}
                </button>
              );
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <label className="text-sm font-medium text-slate-700">
            Category
            <select value={category} onChange={(event) => { setCategory(event.target.value as Category | ""); setActiveCategory(event.target.value as Category | ""); }} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
              <option value="">All categories</option>
              {categories.map((entry) => {
                const categoryMeta = getCategoryMeta(entry);
                return <option key={entry} value={entry}>{categoryMeta.icon} {entry}</option>;
              })}
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            City
            <div className="mt-2 flex gap-2">
              <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Austin, Brooklyn, Denver" className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
              <Button type="button" variant="secondary" className="rounded-full px-3" onClick={handleUseMyLocation}>
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </label>
          <Button className="self-end rounded-full">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {results.map((vouch) => {
          const author = MOCK_USERS.find((user) => user.id === vouch.authorId);
          const categoryMeta = getCategoryMeta(vouch.category);
          return (
            <Card key={vouch.id}>
              <CardHeader>
                <CardTitle>{vouch.recipientName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">{vouch.recipientBusiness}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Compass className="h-4 w-4 text-[#3b82f6]" />
                  <span>{categoryMeta.icon} {categoryMeta.label}</span>
                </div>
                <p>{author?.location}</p>
                <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{vouch.likeCount} vouches · {vouch.rating}★</p>
                <div className="flex flex-wrap gap-2">
                  {vouch.recipientPhone ? (
                    <a href={`tel:${vouch.recipientPhone}`} className="inline-flex items-center rounded-full bg-[#3b82f6] px-3 py-2 text-xs font-semibold text-white">Contact now</a>
                  ) : null}
                  <Button asChild variant="secondary" className="rounded-full">
                    <Link href={`/u/${author?.username ?? "justin"}`}>Open profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
