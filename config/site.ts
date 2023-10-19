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
    github: "https://github.com/AshwinRachha",
    docs: "https://chef-genie.app",
  },
}
