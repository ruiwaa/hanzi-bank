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
    href: "/",
    label: "홈",
    icon: Home,
    iconColor: "text-blue-500",
    iconBgColor: "bg-blue-100",
    ariaLabel: "메인으로 이동",
  },
  {
    href: "/mypage/myWord",
    label: "나의 단어",
    icon: BookMarked,
    iconColor: "text-emerald-500",
    iconBgColor: "bg-emerald-100",
    ariaLabel: "나의 단어로 이동",
    description: "내가 저장한 단어를 확인하세요",
  },
  {
    href: "/mypage/mySentence",
    label: "나의 예문",
    icon: NotebookPenIcon,
    iconColor: "text-amber-500",
    iconBgColor: "bg-amber-100",
    ariaLabel: "나의 예문으로 이동",
    description: "내가 저장한 예문을 확인하세요",
  },
  {
    href: "/mypage/settings",
    label: "설정",
    icon: Settings,
    iconColor: "text-violet-500",
    iconBgColor: "bg-violet-100",
    ariaLabel: "설정으로 이동",
    description: "프로필 편집, 회원 탈퇴 등 설정할 수 있어요",
  },
];
