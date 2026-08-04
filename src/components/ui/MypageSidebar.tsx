import { MYPAGE_SIDEBAR_MENUS } from "@/constants/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function MypageSidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const handleMoveMemu = (menu: (typeof MYPAGE_SIDEBAR_MENUS)[number]) => {
    router.push(menu.href);
  };
  return (
    <>
      <ol className="flex flex-col gap-4 px-4 ">
        {MYPAGE_SIDEBAR_MENUS.map((menu) => {
          const Icon = menu.icon;
          const isActive = menu.href === pathName;
          return (
            <li
              key={menu.label}
              className={`p-3 flex ${
                isActive
                  ? "rounded-2xl bg-[#EFF6FF] text-primary"
                  : "hover:rounded-2xl hover:bg-[#EFF6FF] hover:text-primary"
              }`}
            >
              <button
                onClick={() => handleMoveMemu(menu)}
                className="flex flex-row lg:gap-3 justify-start w-full cursor-pointer"
                aria-label={menu.ariaLabel}
              >
                <Icon />
                <span className="hidden lg:block">{menu.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}
