import { Loader2Icon } from "lucide-react";

interface Props {
  ariaLabel: string;
}

export default function LodingSpinner({ ariaLabel }: Props) {
  return (
    <div
      className="flex flex-col mx-auto min-h-screen justify-center items-center gap-2 mt-3"
      aria-label={`${ariaLabel}를 불러오는 중`}
    >
      <Loader2Icon className="animate-spin" aria-hidden="true" />
      <p>{ariaLabel} 불러오는 중...</p>
    </div>
  );
}
