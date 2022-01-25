import { NavigationOptions } from "./types";

const navigationConfig: NavigationOptions[] = [
  {
    pages: [
      {
        title: "PFTs?",
        href: "https://peledao.app/What-are-PFTs-6b40e1bc68fe4275b0206f95931c6cc0",
        icon: "LocalAtm",
        purchase: false,
        show: true,
        highlight: true,
        classname: "pfts",
        external: true,
      },
      {
        title: "Buy ZIL",
        href: "https://transak.com/",
        icon: "LocalAtm",
        purchase: true,
        show: true,
        highlight: true,
        classname: 'buyzil',
      },
      {
        title: "Get PELE",
        href: "https://transak.com/",
        icon: "LocalAtm",
        purchase: true,
        show: true,
        highlight: true,
        classname:'getpele',
      },
      {
        title: "Community",
        href: "https://discord.gg/CjjG9xMtkX",
        icon: "Discord",
        purchase: false,
        show: true,
        highlight: true,
        classname: 'community',
        external: true
      },
    ],
  },
];

export default navigationConfig;
