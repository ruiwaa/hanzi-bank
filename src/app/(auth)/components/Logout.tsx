"use client";

import { logout } from "@/app/api/logout";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("로그아웃되었습니다.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("로그아웃에 실패했습니다.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-xl  p-3 hover:bg-red-500/10 hover:border-0 hover:text-red-500 flex flex-row gap-2 items-center "
    >
      <LogOutIcon aria-label="로그아웃하기" />
      <span className="hidden lg:block">로그아웃</span>
    </button>
  );
}
