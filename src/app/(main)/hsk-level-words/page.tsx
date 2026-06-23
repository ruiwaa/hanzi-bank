import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";

export default function HskLevelPage() {
  return (
    <div className="max-w-full min-h-screen desktop-layout">
      <Sidebar />
      <SidebarMobile />
      <Header />
      <h2>급수별 단어 목록</h2>
    </div>
  );
}
