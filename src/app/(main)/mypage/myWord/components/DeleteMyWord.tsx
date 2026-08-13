import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

interface Props {
  handleDelete: () => void;
  isPending: boolean;
}

export default function DeleteMyWord({ handleDelete, isPending }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          aria-disabled={isPending}
          onClick={(e) => {
            if (isPending) {
              e.preventDefault();
            }
          }}
          className={`${isPending ? "opacity-50 cursor-not-allowed" : ""} w-20 flex items-center justify-center gap-1 whitespace-nowrap border border-red-500 rounded-lg p-1 text-red-500 text-sm font-bold dark:bg-red-500 dark:text-white`}
        >
          <Trash size={20} aria-hidden="true" />
          {isPending ? "삭제 중..." : "삭제"}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>저장한 단어를 삭제하시겠습니까?</AlertDialogTitle>

          <AlertDialogDescription>
            저장한 단어와 작성한 예문은 함께 삭제되며 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
