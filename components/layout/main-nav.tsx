import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        aria-label="Chef Genie Homepage"
        className="items-center space-x-2 md:flex"
      >
        <Icons.logo className="h-5 w-5 md:h-6 md:w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
