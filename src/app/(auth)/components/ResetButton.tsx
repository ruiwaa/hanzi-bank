import { CircleX } from "lucide-react";

interface Props {
  onClick: () => void;
  text?: string;
}

export default function ResetButton({ onClick, text }: Props) {
  return (
    <>
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
        onClick={onClick}
      >
        <CircleX aria-label={text} />
      </button>
    </>
  );
}
