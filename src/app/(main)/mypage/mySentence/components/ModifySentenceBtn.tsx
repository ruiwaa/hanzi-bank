import { Pen } from "lucide-react";
interface Props {
  onEdit: () => void;
}

export default function ModifySentenceBtn({ onEdit }: Props) {
  return (
    <button
      onClick={onEdit}
      className="flex flex-row gap-1 items-center bg-primary text-white font-semibold rounded-lg px-2 py-1 cursor-pointer dark:bg-blue-500 dark:font-bold"
    >
      <div>
        <Pen aria-hidden="true" />
      </div>
      예문 수정
    </button>
  );
}
