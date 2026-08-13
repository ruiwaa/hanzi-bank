import { Trash } from "lucide-react";
interface Props {
  onDelete: () => void;
}

export default function DeleteMySentenceBtn({ onDelete }: Props) {
  return (
    <button
      onClick={onDelete}
      className="flex flex-row gap-1 items-center border border-red-500 text-red-500 rounded-lg px-2 py-1 cursor-pointer font-semibold dark:bg-red-500 dark:text-white"
    >
      <div>
        <Trash aria-hidden="true" />
      </div>
      삭제
    </button>
  );
}
