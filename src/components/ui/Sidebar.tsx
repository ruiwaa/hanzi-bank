"use client";
import { SIDEBAR_MENUS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchModal } from "@/stores/searchModalStore";

export default function Sidebar() {
  const pathName = usePathname();
  const { open, isOpen } = useSearchModal();
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
                  <Link
                    href={menu.href}
                    className="flex flex-row lg:gap-3 justify-start"
                  >
                    <Icon aria-label={menu.ariaLabel} />
                    <span className="hidden lg:block">{menu.label}</span>
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
