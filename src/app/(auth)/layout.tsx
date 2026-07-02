import { X } from "lucide-react";
import Link from "next/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <Link href={"/"} className="absolute left-6 top-6">
        <X aria-label="현재 페이지 닫기" />
      </Link>
      {children}
    </main>
  );
}
