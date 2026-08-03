import { MYPAGE_SIDEBAR_MENUS } from "@/constants/navigation";
import { useRouter } from "next/navigation";

export default function MypageGuide() {
  const myPageMenus = MYPAGE_SIDEBAR_MENUS.filter((menu) => menu.href !== "/");
  const router = useRouter();
  const handleMoveMemu = (menu: (typeof MYPAGE_SIDEBAR_MENUS)[number]) => {
    router.push(menu.href);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">메뉴</h2>
      <ol className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col gap-2">
        {myPageMenus.map((menu) => {
          const Icon = menu.icon;
          return (
            <li
              key={menu.label}
              className="border-b border-b-gray-200 pb-2 last:border-b-0"
            >
              <button
                onClick={() => handleMoveMemu(menu)}
                className="flex flex-row gap-2 cursor-pointer p-2"
                aria-label={menu.ariaLabel}
              >
                <div
                  className={`${menu.iconBgColor} w-10 h-10 p-2 rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`${menu.iconColor}`} />
                </div>
                <div className="flex flex-col">
                  <span className="self-start font-bold text-lg">
                    {menu.label}
                  </span>
                  <span className="text-gray-500">{menu.description}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
