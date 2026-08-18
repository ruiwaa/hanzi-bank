import { LucideMailCheck } from "lucide-react";

interface Props {
  onclik: () => void;
}

export default function ResetPasswordSuccess({ onclik }: Props) {
  return (
    <div className="bg-card w-full h-100 flex flex-col p-5 rounded-2xl gap-3 border-2 border-accent justify-center items-center">
      <LucideMailCheck size={50} />
      <h2 className="text-2xl font-semibold text-green-500">
        비밀번호 재설정 완료!
      </h2>
      <p>비밀번호가 성공적으로 변경되었습니다.</p>
      <button
        type="button"
        onClick={onclik}
        className="border border-primary p-2 rounded-xl hover:bg-primary/70 font-semibold"
      >
        메인으로 이동
      </button>
    </div>
  );
}
