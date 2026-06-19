"use client";
import { SIDEBAR_MENUS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <>
      <nav className="sidebar py-5 ">
        <ol className="flex flex-col gap-4 px-4 ">
          {SIDEBAR_MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive = menu.href === pathName;
            return (
              <li
                key={menu.href}
                className={`p-3 ${
                  isActive
                    ? "rounded-2xl bg-[#EFF6FF] text-primary"
                    : "hover:rounded-2xl hover:bg-[#EFF6FF] hover:text-primary"
                }`}
              >
                <Link
                  href={menu.href}
                  className="flex flex-row lg:gap-3 justify-start "
                >
                  <Icon aria-label={menu.ariaLabel} />
                  <span className="hidden lg:block">{menu.label}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
