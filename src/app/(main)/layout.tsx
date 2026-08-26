import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import SearchModal from "@/components/ui/SearchModal";
import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";
import { Loader } from "lucide-react";
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
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        }
      >
        <aside className="sidebar border-r border-border bg-card">
          <Link href={"/"} aria-label="중단어 창고 홈 이동">
            <Image
              src="/logo2.png"
              alt=""
              width={200}
              height={200}
              className="hidden lg:block px-4 w-full dark:hidden"
              preload
              fetchPriority="high"
            />
            <Image
              src="/logo2Dark.png"
              alt=""
              width={200}
              height={100}
              className="hidden dark:lg:block px-4 w-full dark:mt-2"
              preload
              fetchPriority="high"
            />
          </Link>
          <Sidebar />
        </aside>
        <div className="flex min-h-screen min-w-0 flex-col">
          <SearchModal />
          <div className="bg-card border-b border-border p-2">
            <Header />
          </div>
          <main id="main-content" className="flex flex-1 flex-col">
            <div className="p-3">{children}</div>
            <Footer />
          </main>
          <SidebarMobile />
        </div>
      </Suspense>
    </div>
  );
}
