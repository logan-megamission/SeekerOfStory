import { ClerkProvider } from "@clerk/nextjs";

type Props = { children: React.ReactNode };

export function AppClerkProvider({ children }: Props) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) return children;

  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
}
