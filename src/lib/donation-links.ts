export type DonationLink = {
  id: string;
  label: string;
  description: string;
  href: string;
};

/** External donation URLs — set in Vercel env when ready. */
export function getDonationLinks(): DonationLink[] {
  const links: DonationLink[] = [];

  const paypal = process.env.NEXT_PUBLIC_DONATION_PAYPAL_URL;
  if (paypal) {
    links.push({
      id: "paypal",
      label: "Donate via PayPal",
      description: "One-time or recurring gifts",
      href: paypal,
    });
  }

  const venmo = process.env.NEXT_PUBLIC_DONATION_VENMO_URL;
  if (venmo) {
    links.push({
      id: "venmo",
      label: "Send via Venmo",
      description: "Quick mobile contribution",
      href: venmo,
    });
  }

  const stripe = process.env.NEXT_PUBLIC_DONATION_STRIPE_URL;
  if (stripe) {
    links.push({
      id: "stripe",
      label: "Donate Securely",
      description: "Card payments via Stripe",
      href: stripe,
    });
  }

  const cashApp = process.env.NEXT_PUBLIC_DONATION_CASHAPP_URL;
  if (cashApp) {
    links.push({
      id: "cashapp",
      label: "Send via Cash App",
      description: "Mobile contribution",
      href: cashApp,
    });
  }

  return links;
}

export const hasDonationLinks = () => getDonationLinks().length > 0;
