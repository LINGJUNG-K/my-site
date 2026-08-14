import type { UserConfig } from "../src/site.config";

const userConfig: UserConfig = {
  title: "不想變成討厭的樣子啊",
  description:
    "如果可以，我想當個值得被愛的爸爸",

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
