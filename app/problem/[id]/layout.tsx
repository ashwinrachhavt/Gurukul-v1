import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

interface ProblemLayoutProps {
  children: React.ReactNode
}



export default async function ProblemsTableLayout({
  children,
}: ProblemLayoutProps) {
  const user = await currentUser();
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user = {user} />
      <div className="mx-auto flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
