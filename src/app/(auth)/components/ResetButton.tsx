import { CircleX } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function ResetButton({ onClick }: Props) {
  return (
    <>
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
        onClick={onClick}
      >
        <CircleX aria-label="작성 중인 이메일 초기화 하기" />
      </button>
    </>
  );
}
