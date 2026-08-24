import Link from "next/link";
import DarkMode from "./DarkMode";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 mt-3 flex flex-row justify-between">
      <Link href="/" className="dark:mb-10">
        <Image
          src="/logo2.png"
          alt="중단어 창고 로고"
          width={150}
          height={100}
          priority
          className="dark:hidden"
        />
        <Image
          src="/logo2Dark.png"
          alt="중단어 창고 로고"
          width={150}
          height={50}
          priority
          className="hidden dark:block "
        />
      </Link>
      <DarkMode />
    </header>
  );
}
