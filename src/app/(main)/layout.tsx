import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";
import Image from "next/image";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full min-h-screen desktop-layout">
      <h1 className="sr-only">중단어 창고 메인페이지</h1>
      <aside className="sidebar border-r border-border bg-white min-h-screen">
        <Link href={"/"}>
          <Image
            src="/logo2.png"
            alt={"중단어 창고 로고"}
            width={200}
            height={200}
            className="hidden lg:block px-4"
          />
        </Link>
        <Sidebar />
      </aside>
      <div className="flex flex-col min-w-0">
        <div className="bg-white">
          <Header />
        </div>
        <main className="flex-1 dark:bg-black p-3">{children}</main>
        <SidebarMobile />
      </div>
    </div>
  );
}
