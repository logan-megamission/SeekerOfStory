import { redirect } from "next/navigation";

/** Public sign-up is disabled — admins are invited in Clerk only. */
export default function SignUpPage() {
  redirect("/sign-in");
}
