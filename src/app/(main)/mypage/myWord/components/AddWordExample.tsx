import { Pen } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function AddWordExample({ onClick }: Props) {
  return (
    <div className="flex flex-col w-fit">
      <button
        type="button"
        onClick={onClick}
        className="flex w-30 items-center justify-center gap-2 rounded-lg bg-primary px-2 py-1 text-sm font-bold text-white"
      >
        <Pen size={20} aria-hidden="true" />
        예문 추가하기
      </button>
    </div>
  );
}
