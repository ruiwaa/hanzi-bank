import { Home, Search, User } from "lucide-react";

export const SIDEBAR_MENUS = [
  {
    type: "link",
    href: "/",
    label: "홈",
    icon: Home,
    ariaLabel: "메인으로 이동",
  },
  {
    type: "modal",
    href: "/search",
    label: "검색",
    icon: Search,
    ariaLabel: "검색창으로 이동",
  },
  {
    type: "link",
    href: "/mypage",
    label: "마이페이지",
    icon: User,
    ariaLabel: "마이페이지로 이동",
    requireAuth: true,
  },
];
