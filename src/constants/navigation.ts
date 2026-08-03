import {
  BookMarked,
  Home,
  NotebookPenIcon,
  Search,
  Settings,
  User,
} from "lucide-react";

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

export const MYPAGE_SIDEBAR_MENUS = [
  {
    type: "link",
    href: "/myWord",
    label: "나의 단어",
    icon: BookMarked,
    ariaLabel: "나의 단어로 이동",
  },
  {
    type: "link",
    href: "/mySentence",
    label: "나의 예문",
    icon: NotebookPenIcon,
    ariaLabel: "나의 예문으로 이동",
  },
  {
    type: "link",
    href: "/settings",
    label: "설정",
    icon: Settings,
    ariaLabel: "설정으로 이동",
  },
];
