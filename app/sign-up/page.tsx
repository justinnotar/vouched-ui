"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "@/components/auth-state-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_USERS } from "@/lib/mock-data";

export default function SignUpPage() {
  const router = useRouter();
  const { signIn } = useAuthState();
  const [formName, setFormName] = useState("New Vouched User");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newUser = {
      ...MOCK_USERS[0],
      id: "user-temp",
      username: "new-user",
      name: formName,
    };
    signIn(newUser);
    router.push("/dashboard");
  };

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Create your Vouched page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm leading-7 text-slate-600">Create a shareable page for the people you trust, add vouches, request referrals, and send a single link whenever someone needs a good local provider.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Full name
              <input value={formName} onChange={(event) => setFormName(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" />
            </label>
            <Button type="submit" className="w-full rounded-full">Create account</Button>
          </form>
          <Link href="/sign-in" className="mt-3 inline-flex text-sm font-semibold text-[#3b82f6] hover:underline">Back to sign in</Link>
        </CardContent>
      </Card>
    </section>
  );
}
