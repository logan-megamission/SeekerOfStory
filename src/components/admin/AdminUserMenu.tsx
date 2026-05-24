"use client";

import { UserButton } from "@clerk/nextjs";

export function AdminUserMenu() {
  return (
    <div className="flex items-center gap-3">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
          },
        }}
      />
    </div>
  );
}
