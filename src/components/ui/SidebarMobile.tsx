"use client";
import { SIDEBAR_MENUS } from "@/constants/navigation";
import { useSearchModal } from "@/stores/searchModalStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMobile() {
  const pathName = usePathname();
  const { open, isOpen } = useSearchModal();

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
                  <Link
                    href={menu.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      aria-label={menu.ariaLabel}
                      className="hover:text-primary"
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
