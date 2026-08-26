import { Copy, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}
export default function UserGuideInfoModal({ onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="bg-background border-2 border-dashed border-orange-400 p-3 rounded-lg flex flex-col justify-center gap-2"
    >
      <button
        type="button"
        onClick={onClose}
        className="self-end"
        aria-label="창 닫기"
      >
        <X aria-hidden="true" />
      </button>
      <div className="flex flex-col gap-1 p-2">
        <h3 className="font-semibold text-center text-lg">
          중단어 학습을 위한 포토폴리오 프로젝트입니다.
        </h3>
        <p className="text-center">회원 전용 페이지을 이용하시려면,</p>
        <p className="text-center">
          구글 소셜 로그인 또는 새 계정을 생성한 후 접근할 수 있습니다.
        </p>
        <div className="bg-indigo-500/30 p-3 rounded-2xl">
          <h4>테스트 계정 안내</h4>
          <div className="flex flex-row gap-2">
            <p>ID: test2@test.com</p>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText("test2@test.com");
                toast.success("아이디 복사됨");
              }}
              aria-label="테스트 계정 이메일 복사"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <p>PW: test123!</p>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText("test123!");
                toast.success("비밀번호 복사됨");
              }}
              aria-label="테스트 계정 비밀번호 복사"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
