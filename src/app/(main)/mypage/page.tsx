import Sidebar from "@/components/ui/Sidebar";
import SidebarMobile from "@/components/ui/SidebarMobile";

export default function Mypage() {
  return (
    <div className="max-w-full min-h-screen desktop-layout">
      <h1>마이페이지</h1>
      <Sidebar />
      <SidebarMobile />
    </div>
  );
}
