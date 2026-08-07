import { Trash } from "lucide-react";

export default function DeleteMySentenceBtn() {
  return (
    <button className="flex flex-row gap-1 items-center border border-red-500 text-red-500 rounded-lg px-2 py-1">
      <div>
        <Trash aria-hidden="true" />
      </div>
      삭제
    </button>
  );
}
