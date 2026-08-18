import Link from "next/link";
import ForgotPasswordAuthForm from "../components/ForgotPasswordAuthForm";
import Image from "next/image";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col w-full items-center gap-5">
      <h1 className="sr-only">비밀번호 재설정</h1>
      <Link href="/">
        <Image
          src="/logo2.png"
          alt="중단어 창고 로고"
          width={200}
          height={200}
          priority
        />
      </Link>
      <ForgotPasswordAuthForm />
    </div>
  );
}
