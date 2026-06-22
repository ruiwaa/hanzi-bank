import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";

export default function HskLevelPage() {
  return (
    <div className="max-w-full min-h-screen desktop-layout">
      <h1>급수별 단어 목록</h1>
      <Sidebar />
      <SidebarMobile />
    </div>
  );
}
