import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema } from "@/components/seo/JsonLd";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationSchema />
      <Nav />
      <main className="flex-1 pt-[70px]">{children}</main>
      <Footer />
    </>
  );
}
