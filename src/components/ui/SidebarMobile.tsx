"use client";
import { usePathname } from "next/navigation";
import MypageMoblileSidebar from "./MypageMobileSidebar";
import MainMobileSidebar from "./MainMobileSidebar";

export default function SidebarMobile() {
  const pathName = usePathname();
  const isMypage = pathName.startsWith("/mypage");

  return (
    <nav className="mobile-bottom-nav bg-white py-3 border-t border-border ">
      {isMypage ? <MypageMoblileSidebar /> : <MainMobileSidebar />}
    </nav>
  );
}
