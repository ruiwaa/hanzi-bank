import { Pen } from "lucide-react";

export default function AddWordExample() {
  return (
    <button className="flex flex-row items-center justify-center gap-2 bg-primary rounded-lg p-1 w-30 text-sm whitespace-nowrap text-white font-bold">
      <div className="w-5">
        <Pen size={20} aria-hidden="true" />
      </div>
      예문 추가하기
    </button>
  );
}
