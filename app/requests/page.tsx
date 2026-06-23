"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MessageSquarePlus, Sparkles } from "lucide-react";
import { useAuthState } from "@/components/auth-state-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addVouch, MOCK_USERS, MOCK_VOUCH_REQUESTS, type Category, type VouchRequest } from "@/lib/mock-data";

const categoryOptions: Category[] = ["Plumber", "Electrician", "Accountant", "Lawyer", "Dentist", "Doctor", "Contractor", "IT", "Realtor", "Landscaper", "Cleaner", "Mechanic", "Trainer", "Tutor", "Chef", "Other"];

export default function RequestsPage() {
  const { user, isSignedIn } = useAuthState();
  const searchParams = useSearchParams();
  const prefilledTargetUsername = searchParams.get("target") ?? "";
  const prefilledTarget = MOCK_USERS.find((entry) => entry.username.toLowerCase() === prefilledTargetUsername.toLowerCase());
  const [requests, setRequests] = useState<VouchRequest[]>(MOCK_VOUCH_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Plumber");
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedTargetId, setSelectedTargetId] = useState(prefilledTarget?.id ?? "");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [requestCategory, setRequestCategory] = useState<Category>("Plumber");
  const [requestMessage, setRequestMessage] = useState(prefilledTarget ? `Hi ${prefilledTarget.name}, I’m looking for a trusted ${"Plumber".toLowerCase()} in ${prefilledTarget.location.split(",")[0]}. Could you point me to someone you’d recommend?` : "");
  const [requestSent, setRequestSent] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  if (!isSignedIn || !user) {
    return (
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="flex flex-col gap-4 py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">Requests</p>
            <h1 className="text-3xl font-semibold text-slate-900">Requests are easier when you're signed in.</h1>
            <p className="text-sm leading-7 text-slate-600">This inbox is a mock version of the vouch request flow that will later connect to real data.</p>
            <Button asChild className="w-fit rounded-full">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const handleRespond = (requestId: string) => {
    setSelectedRequestId(requestId);
    const request = requests.find((entry) => entry.id === requestId);
    if (request) {
      setSelectedCategory(request.categoryNeeded);
      setReplyMessage(`I’d be happy to recommend someone for ${request.categoryNeeded.toLowerCase()} in ${request.message.includes("Austin") ? "Austin" : "your area"}.`);
      setSelectedTargetId(request.targetUserId);
    }
    setShowPrompt(true);
  };

  const handleSendRequest = () => {
    if (!user || !selectedTargetId) {
      return;
    }

    const target = MOCK_USERS.find((entry) => entry.id === selectedTargetId);
    const nextRequest: VouchRequest = {
      id: `request-${Date.now()}`,
      requesterId: user.id,
      targetUserId: selectedTargetId,
      categoryNeeded: requestCategory,
      message: requestMessage.trim() || `Hi ${target?.name ?? "there"}, I’d love a trusted recommendation for a ${requestCategory.toLowerCase()}.`,
      status: "Pending",
    };

    setRequests((current) => [nextRequest, ...current]);
    setRequestSent(true);
  };

  const handleCreateVouchFromComposer = () => {
    if (!selectedRequestId || !user || !selectedTargetId || !replyMessage.trim()) {
      return;
    }

    const target = MOCK_USERS.find((entry) => entry.id === selectedTargetId);
    addVouch({
      authorId: user.id,
      recipientName: target?.name ?? "Trusted contact",
      recipientBusiness: `${selectedCategory} referral`,
      category: selectedCategory,
      description: replyMessage.trim(),
      rating: 5,
    });

    setRequests((current) => current.map((request) => request.id === selectedRequestId ? { ...request, status: "Answered" } : request));
    setShowPrompt(true);
    setReplyMessage("");
    setSelectedRequestId(null);
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#3b82f6]">Requests</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">People are asking for trusted vouches.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">No requests right now. Your inbox will fill up as people ask for vouches.</div>
            ) : (
              requests.map((request) => {
                const target = MOCK_USERS.find((entry) => entry.id === request.targetUserId);
                return (
                  <div key={request.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-900">{target?.name ?? "Someone"} is looking for a good {request.categoryNeeded.toLowerCase()}.</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{request.message}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button className="rounded-full" onClick={() => handleRespond(request.id)}>Respond with a vouch</Button>
                      <Button variant="secondary" className="rounded-full" onClick={() => setShowPrompt(true)}>Promote this request</Button>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{prefilledTarget ? `Ask ${prefilledTarget.name} for a referral` : "Request a referral"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Who you want a referral from
                <select value={selectedTargetId} onChange={(event) => setSelectedTargetId(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  <option value="">Select a person</option>
                  {MOCK_USERS.filter((entry) => entry.id !== user?.id).map((entry) => (
                    <option key={entry.id} value={entry.id}>{entry.name}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                What you need
                <select value={requestCategory} onChange={(event) => setRequestCategory(event.target.value as Category)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Message
                <textarea value={requestMessage} onChange={(event) => setRequestMessage(event.target.value)} className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Tell them what you need and when you need it." />
              </label>
              <Button className="w-full rounded-full" onClick={handleSendRequest}>Send referral request</Button>
              {requestSent ? <p className="text-sm font-medium text-[#3b82f6]">Your request is now in the inbox.</p> : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reply composer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Suggested category
                <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value as Category)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Message
                <textarea value={replyMessage} onChange={(event) => setReplyMessage(event.target.value)} className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Tell them about the person you trust." />
              </label>
              <Button className="w-full rounded-full" onClick={handleCreateVouchFromComposer}>Add a vouch</Button>
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Promoted requests</p>
                <p className="mt-1">A paywall modal for promoting this request is shown as a visual stub.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showPrompt ? (
        <Card className="border-[#3b82f6]/20 bg-blue-50/60">
          <CardContent className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-900">Your response is ready.</p>
              <p className="text-sm text-slate-600">Share the recommendation and let the network benefit from your trusted referral.</p>
            </div>
            <Button variant="secondary" className="rounded-full" onClick={() => setShowPrompt(false)}>Close</Button>
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}
