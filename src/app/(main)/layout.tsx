import Header from "@/components/ui/Header";
import SearchModal from "@/components/ui/SearchModal";
import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full min-h-screen desktop-layout">
      <h1 className="sr-only">중단어 창고 메인페이지</h1>
      <Suspense fallback={<div className="animate-pulse">로딩 중...</div>}>
        <aside className="sidebar border-r border-border bg-white min-h-screen">
          <Link href={"/"} aria-label="중단어 창고 홈 이동">
            <Image
              src="/logo2.png"
              alt=""
              width={200}
              height={200}
              className="hidden lg:block px-4 w-full"
            />
          </Link>
          <Sidebar />
        </aside>
        <SearchModal />
        <div className="flex flex-col min-w-0">
          <div className="bg-white border-b border-border p-2">
            <Header />
          </div>
          <main className="flex-1 dark:bg-black p-3 mb-20">{children}</main>
          <SidebarMobile />
        </div>
      </Suspense>
    </div>
  );
}
