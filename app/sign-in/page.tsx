"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "@/components/auth-state-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_USERS } from "@/lib/mock-data";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuthState();
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[0]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    signIn(selectedUser);
    router.push("/dashboard");
  };

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Welcome back to Vouched</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm leading-7 text-slate-600">Use the demo profile to continue exploring the product and see how a real shareable vouch page feels.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Demo account
              <select value={selectedUser.username} onChange={(event) => setSelectedUser(MOCK_USERS.find((user) => user.username === event.target.value) ?? MOCK_USERS[0])} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
                {MOCK_USERS.map((user) => (
                  <option key={user.id} value={user.username}>{user.name}</option>
                ))}
              </select>
            </label>
            <Button type="submit" className="w-full rounded-full">Continue</Button>
          </form>
          <Link href="/sign-up" className="mt-3 inline-flex text-sm font-semibold text-[#3b82f6] hover:underline">Create an account</Link>
        </CardContent>
      </Card>
    </section>
  );
}
