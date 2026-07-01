"use client";
import { SIDEBAR_MENUS } from "@/constants/navigation";
import { usePathname } from "next/navigation";
import { useSearchModal } from "@/stores/searchModalStore";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/stores/loginModalStore";

export default function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const { open, isOpen } = useSearchModal();
  const { open: openLoginModal } = useLoginModal();
  const { user } = useSession();

  const handleMoveMemu = (menu: (typeof SIDEBAR_MENUS)[number]) => {
    if (menu.requireAuth && !user) {
      openLoginModal();
      return;
    }

    router.push(menu.href);
  };
  return (
    <>
      <nav className="sidebar py-5 ">
        <ol className="flex flex-col gap-4 px-4 ">
          {SIDEBAR_MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive =
              menu.type === "modal"
                ? isOpen || pathName === "/search"
                : menu.href === pathName;
            return (
              <li
                key={menu.label}
                className={`p-3 ${
                  isActive
                    ? "rounded-2xl bg-[#EFF6FF] text-primary"
                    : "hover:rounded-2xl hover:bg-[#EFF6FF] hover:text-primary"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {menu.type === "modal" ? (
                  <button
                    onClick={open}
                    className="flex flex-row lg:gap-3 justify-start w-full cursor-pointer"
                    aria-label={menu.ariaLabel}
                    aria-pressed={isOpen}
                  >
                    <Icon />
                    <span className="hidden lg:block">{menu.label}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleMoveMemu(menu)}
                    className="flex flex-row lg:gap-3 justify-start"
                  >
                    <Icon aria-label={menu.ariaLabel} />
                    <span className="hidden lg:block">{menu.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-auto px-4">
          {user ? (
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                location.reload();
              }}
              className="w-full rounded-xl border border-red-500 py-2"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-xl border border-primary py-2"
            >
              로그인
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
