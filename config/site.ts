export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Gurukul",
  url: "",
  ogImage: "../public/images/gem.png",
  description:
    "An open source recipe generator powered by OpenAi and ChatGPT.",
  mainNav: [
    {
      title: "Chef Genie Homepage",
      href: "/",
    },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/ashwinrachha/",
    github: "mailto:ashwinr@vt.edu",
    docs: "https://chef-genie.app",
  },
}
