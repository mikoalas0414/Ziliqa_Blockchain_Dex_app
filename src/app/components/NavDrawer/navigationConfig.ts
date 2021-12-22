import { NavigationOptions } from "./types";

const navigationConfig: NavigationOptions[] = [{
  pages: [{
    title: "Swap + Pool",
    href: "/swap",
    icon: "SwapHoriz",
    show: true,
  }, {
    title: "Pools",
    href: "/pools",
    icon: "Layers",
  }, {
    title: "ARKY",
    href: "/arky",
    icon: "Dashboard",
    badge: "BETA",
  },
  {
    title: "ZilBridge",
    href: "/bridge",
    icon: "Bridge",
    badge: "NOW LIVE",
  }, {
    title: "ZILO",
    href: "/zilo",
    icon: "Flame",
  }, {
    title: "Guide",
    href: "https://zilswap.gitbook.io/zilswap/",
    icon: "FileCopy",
    external: true,
    show: true,
  }, {
    title: "Governance",
    icon: "Gavel",
    expand: true,
    items: [{
      title: "Voting",
      href: "https://vote.zilliqa.com/#/zwap/",
      icon: "HowToVote",
      external: true,
      show: true,
    }, {
      title: "Forum",
      href: "https://gov.zilswap.io",
      icon: "Forum",
      external: true,
      show: true,
    }]
  }, {
    title: "More",
    icon: "MoreHoriz",
    expand: true,
    items: [{
      title: "Developer",
      href: "https://docs.zilswap.org/#/smart-contract",
      icon: "DeveloperBoard",
      external: true,
      show: true,
    }, {
      title: "Github",
      href: "https://github.com/Switcheo/zilswap",
      icon: "Code",
      external: true,
      show: true,
    }, {
      title: "SDK",
      href: "https://github.com/Switcheo/peleswap-sdk",
      icon: "Category",
      external: true,
      show: true,
    }, {
      title: "ZilStream",
      href: "https://zilstream.com",
      icon: "Insights",
      external: true,
      show: true,
    }]
  }, {
    title: "Buy ZIL",
    href: "https://transak.com/",
    icon: "LocalAtm",
    purchase: true,
    show: true,
    highlight: true
  }],
}];

export default navigationConfig;
