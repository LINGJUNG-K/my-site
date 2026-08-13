import type { UserConfig } from "../src/site.config";

const userConfig: UserConfig = {
  title: "不是你的錯",
  description:
    "你用最純淨的樣子來到我身邊，所以我知道不是你的錯",

  url: "https://my-site-8sm.pages.dev/",
  author: "LJK",

  logo: "/logo.svg",
  avatar: "/avatar.png",

  navigation: [
    { title: "Writing", url: "/posts" },
    { title: "Archive", url: "/archive" },
    { title: "About", url: "/about" },
  ],

  footerLinks: [
    { title: "RSS", url: "/rss.xml" },
    { title: "Archive", url: "/archive" },
    { title: "Source", url: "https://github.com/thelocalhoststudio/lipi" },

  ],

  // social: [
  //   {
  //     title: "GitHub",
  //     url: "https://github.com/thelocalhoststudio/lipi",
  //     icon: "github",
  //   },
  //   {
  //     title: "X",
  //     url: "https://x.com/",
  //     icon: "x",
  //   },
  //   {
  //     title: "LinkedIn",
  //     url: "https://linkedin.com/",
  //     icon: "linkedin",
  //   },

  // ],

  footerCredits: "Designed for reading. Built with Astro & Lipi",

  postsPerPage: 8,
  recentPosts: 6,
  relatedPosts: 4,

  showThemeToggle: true,
  showReadingTime: true,

  heroVariant: "studio",

  annotation: "Writing between filter coffees and terminal windows.",
};

export default userConfig;
