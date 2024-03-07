import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="sticky top-[100vh] w-full border-t">
      <div className="items-center justify-center py-4">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Ashwin Rachha
          </a>
          . If Any Questions, Please reach out at {" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Email
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
