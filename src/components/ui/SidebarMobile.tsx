"use client";
import { SIDEBAR_MENUS } from "@/constants/navigation";
import { useSession } from "@/hooks/useSession";
import { useLoginModal } from "@/stores/loginModalStore";
import { useSearchModal } from "@/stores/searchModalStore";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarMobile() {
  const pathName = usePathname();
  const router = useRouter();
  const { open, isOpen } = useSearchModal();
  const { open: openLoginModal } = useLoginModal();
  const { user } = useSession();

  const handleMoveMemu = (menu: (typeof SIDEBAR_MENUS)[number]) => {
    if (!user && menu.requireAuth) {
      openLoginModal();
      return;
    }
    router.push(`${menu.href}`);
  };

  return (
    <>
      <nav className="mobile-bottom-nav bg-white py-3 border-t border-border ">
        <ol className="flex flex-row items-center justify-around ">
          {SIDEBAR_MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive =
              menu.type === "modal"
                ? isOpen || pathName === "/search"
                : menu.href === pathName;
            return (
              <li
                key={menu.href}
                className={
                  isActive ? "text-primary" : "text-sidebar-foreground"
                }
              >
                {menu.type === "modal" ? (
                  <button onClick={open} aria-pressed={isOpen}>
                    <Icon aria-label={menu.ariaLabel} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleMoveMemu(menu)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      aria-label={menu.ariaLabel}
                      className="hover:text-primary"
                    />
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
