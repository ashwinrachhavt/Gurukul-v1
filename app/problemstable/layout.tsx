import { currentUser } from "@clerk/nextjs";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface ProblemsTableLayoutProps {
  children: React.ReactNode;
}

export default async function ProblemsTableLayout({
  children,
}: ProblemsTableLayoutProps) {
  const user = await currentUser();

  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center">
      <SiteHeader user={user} />
      <div className="flex-1 w-full flex items-center justify-center">{children}</div>
      <SiteFooter />
    </div>
  );
}
