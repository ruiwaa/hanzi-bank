import { Pen } from "lucide-react";

export default function ModifySentenceBtn() {
  return (
    <button className="flex flex-row gap-1 items-center bg-primary text-white rounded-lg px-2 py-1">
      <div>
        <Pen aria-hidden="true" />
      </div>
      예문 수정
    </button>
  );
}
