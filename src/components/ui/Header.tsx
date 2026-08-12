import Link from "next/link";
import Image from "next/image";
import DarkMode from "./DarkMode";

export default function Header() {
  return (
    <header className="h-16  mt-3 w-full">
      <Link href={"/"} className="inline-block">
        <Image
          src="/logo2.png"
          alt={"중단어 창고 로고"}
          width={150}
          height={100}
          priority
        />
      </Link>
      <DarkMode />
    </header>
  );
}
