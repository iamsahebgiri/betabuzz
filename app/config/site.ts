export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "BetaBuzz",
  description: "Creating a buzz around the latest beta products",
  mainNav: [
    {
      title: "Popular",
      href: "/",
    },
    {
      title: "Recent",
      href: "/recent",
    },
    {
      title: "Trending",
      href: "/trending",
    },
  ],
  links: {
    twitter: "https://twitter.com/iamsahebgiri",
    github: "https://github.com/iamsahebgiri",
    docs: "https://betabuzz.vercel.app",
  },
}
