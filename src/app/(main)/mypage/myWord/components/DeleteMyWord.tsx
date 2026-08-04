import { Trash } from "lucide-react";

export default function DeleteMyWord() {
  return (
    <button className="w-15 flex flex-row gap-1 border items-center justify-center border-red-500 rounded-lg p-1 text-red-500 text-sm font-bold">
      <Trash size={20} />
      삭제
    </button>
  );
}
