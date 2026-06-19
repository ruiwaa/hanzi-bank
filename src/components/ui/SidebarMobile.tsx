"use client";
import { SIDEBAR_MENUS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMobile() {
  const pathName = usePathname();

  return (
    <>
      <nav className="mobile-bottom-nav bg-white py-3 border-t border-border ">
        <ol className="flex flex-row items-center justify-around ">
          {SIDEBAR_MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive = menu.href === pathName;
            return (
              <li
                key={menu.href}
                className={
                  isActive ? "text-primary" : "text-sidebar-foreground"
                }
              >
                <Link href={menu.href}>
                  <Icon
                    aria-label={menu.ariaLabel}
                    className="hover:text-primary"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
