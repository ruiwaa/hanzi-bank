import { MYPAGE_SIDEBAR_MENUS } from "@/constants/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function MypageMoblileSidebar() {
  const pathName = usePathname();
  const router = useRouter();

  const handleMoveMemu = (menu: (typeof MYPAGE_SIDEBAR_MENUS)[number]) => {
    router.push(menu.href);
  };

  return (
    <>
      <ol className="flex flex-row items-center justify-around ">
        {MYPAGE_SIDEBAR_MENUS.map((menu) => {
          const Icon = menu.icon;
          const isActive = menu.href === pathName;
          return (
            <li
              key={menu.href}
              className={isActive ? "text-primary" : "text-sidebar-foreground"}
            >
              <button
                onClick={() => handleMoveMemu(menu)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  aria-label={menu.ariaLabel}
                  className="hover:text-primary"
                />
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}
