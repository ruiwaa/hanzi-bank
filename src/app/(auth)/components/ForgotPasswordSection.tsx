import { useRouter } from "next/navigation";

export default function ForgotPasswordSection() {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-2 text-sm">
      <span>비밀번호를 잊으셨나요?</span>
      <button
        type="button"
        className="hover:text-red-500 font-semibold"
        onClick={() => router.push("/find-password")}
      >
        비밀번호 재설정
      </button>
    </div>
  );
}
