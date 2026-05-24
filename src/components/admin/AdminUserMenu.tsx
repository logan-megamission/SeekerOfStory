"use client";

import { UserButton, useUser } from "@clerk/nextjs";

function displayNameFor(user: ReturnType<typeof useUser>["user"]) {
  if (!user) return "Admin";
  const full = user.fullName?.trim();
  if (full) return full;
  const parts = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (parts) return parts;
  if (user.username) return user.username;
  return user.primaryEmailAddress?.emailAddress ?? "Admin";
}

export function AdminUserMenu() {
  const { user, isLoaded } = useUser();
  const name = displayNameFor(user);
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="space-y-3">
      {isLoaded && (
        <div className="min-w-0">
          <p
            className="text-[0.78rem] font-medium text-white leading-snug truncate"
            style={{ fontFamily: "var(--font-sans)" }}
            title={name}
          >
            {name}
          </p>
          {email && (
            <p
              className="text-[0.58rem] text-white/45 truncate mt-0.5"
              style={{ fontFamily: "var(--font-sans)" }}
              title={email}
            >
              {email}
            </p>
          )}
        </div>
      )}
      <UserButton
        showName={false}
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
            userButtonPopoverCard: "border border-sos-border",
          },
        }}
      />
    </div>
  );
}
