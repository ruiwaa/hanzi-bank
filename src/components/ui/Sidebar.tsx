"use client";
import { usePathname } from "next/navigation";
import MainSidebar from "./MainSidebar";
import MypageSidebar from "./MypageSidebar";

export default function Sidebar() {
  const pathName = usePathname();
  const isMypage = pathName.startsWith("/mypage");

  return (
    <nav className="sidebar py-5 ">
      {isMypage ? <MypageSidebar /> : <MainSidebar />}
    </nav>
  );
}
