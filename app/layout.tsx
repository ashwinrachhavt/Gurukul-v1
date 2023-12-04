import "@/styles/globals.css"
import { Metadata, Viewport } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
 metadataBase: new URL("https://placeholder.com"),
 title: {
   default: siteConfig.name,
   template: `%s - ${siteConfig.name}`,
 },
 description: siteConfig.description,
 keywords: [
   "Gurukul",
   "AI Powered LMS",
   "AI Powered Coding",
   "Learn Coding",
   "DSA",
   "Chef AI",
   "RAG",
   "LLMS",
   "Adaptive Learning",
 ],
 authors: [
   {
     name: "Ashwin Rachha",
     url: "https://github.com/AshwinRachha",
   },
 ],
 creator: "Ashwin Rachha",
 openGraph: {
   type: "website",
   locale: "en_US",
   url: siteConfig.url,
   title: siteConfig.name,
   description: siteConfig.description,
   siteName: siteConfig.name,
   images: [
     {
       url: siteConfig.ogImage,
       width: 1200,
       height: 630,
       alt: siteConfig.name,
     },
   ],
 },
 twitter: {
   card: "summary_large_image",
   title: siteConfig.name,
   description: siteConfig.description,
   images: [siteConfig.ogImage],
   creator: "@",
 },
 icons: {
   icon: "./favicon.ico",
 },
}

export const viewport: Viewport = {
 themeColor: [
   { media: "(prefers-color-scheme: light)", color: "white" },
   { media: "(prefers-color-scheme: dark)", color: "black" },
 ],
}

interface RootLayoutProps {
 children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
 return (
   <ClerkProvider>
     <html lang="en" suppressHydrationWarning>
       <head />
       <body
         className={cn(
           "min-h-screen bg-background font-sans antialiased",
           fontSans.variable
         )}
       >
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
           <div className="relative flex min-h-screen flex-col">
             <div >{children}</div>
           </div>
           <Analytics />
         </ThemeProvider>
         <Toaster />
       </body>
     </html>
   </ClerkProvider>
 )
}
