import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

const isClerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }
});

function withoutClerk(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    (pathname === "/admin" || pathname.startsWith("/admin/")) &&
    pathname !== "/admin-setup"
  ) {
    return NextResponse.rewrite(new URL("/admin-setup", req.url));
  }
  return NextResponse.next();
}

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  if (!isClerkConfigured) {
    return withoutClerk(req);
  }
  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
