import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
      <div>
        <header className="h-16 border-b border-border bg-white">
          <Link href={"/"}>
            <Image
              src="/logo2.png"
              alt={"중단어 창고 로고"}
              width={150}
              height={100}
            />
          </Link>
        </header>
        <main className="  dark:bg-black bg-purple-300">메인 페이지 영역</main>
        <SidebarMobile />
      </div>
    </div>
  );
}
