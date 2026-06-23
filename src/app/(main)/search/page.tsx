import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";

export default function Search() {
  return (
    <div className="max-w-full min-h-screen desktop-layout">
      <h1>검색 페이지</h1>
      <Sidebar />
      <SidebarMobile />
    </div>
  );
}
