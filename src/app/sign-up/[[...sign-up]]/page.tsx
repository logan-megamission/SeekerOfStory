import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <section className="bg-warm-white py-16 px-8 min-h-[50vh] flex items-center justify-center">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/admin"
        fallbackRedirectUrl="/admin"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none border border-sos-border rounded-none",
            headerTitle: "font-serif font-light",
            formButtonPrimary:
              "bg-charcoal hover:bg-charcoal/90 rounded-none text-[0.7rem] tracking-[0.15em] uppercase",
          },
        }}
      />
    </section>
  );
}
