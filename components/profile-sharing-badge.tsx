"use client";

import { Sparkles } from "lucide-react";
import { useAuthState } from "@/components/auth-state-provider";
import type { User } from "@/lib/mock-data";

interface ProfileSharingBadgeProps {
  user: User;
}

export function ProfileSharingBadge({ user }: ProfileSharingBadgeProps) {
  const { user: authUser } = useAuthState();
  const isOwnProfile = Boolean(authUser && authUser.id === user.id);

  if (isOwnProfile) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <Sparkles className="h-4 w-4 text-[#3b82f6]" />
      Publicly shared by {user.name}
    </div>
  );
}
