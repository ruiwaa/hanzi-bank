"use client";
import { useDeleteMyWord } from "@/hooks/useDeleteMyWord";
import { useIsSavedWord } from "@/hooks/useIsSavedWord";
import { useSaveWord } from "@/hooks/useSaveWord";
import { useSession } from "@/hooks/useSession";
import { useLoginModal } from "@/stores/loginModalStore";
import { Bookmark } from "lucide-react";

interface Props {
  wordId: string;
  showText?: boolean;
  className?: string;
}

export default function SaveWordBtn({
  wordId,
  showText = false,
  className = "",
}: Props) {
  const { user } = useSession();
  const { open } = useLoginModal();
  const { mutate: saveWord, isPending: isSaving } = useSaveWord();
  const { mutate: deleteWord, isPending: isDeleting } = useDeleteMyWord();
  const { data: isSaved = false } = useIsSavedWord({
    userId: user?.id,
    wordId,
  });
  const isPending = isSaving || isDeleting;

  const handleSaveWord = () => {
    if (!user) {
      open();
      return;
    }
    if (isSaved) {
      deleteWord({
        userId: user.id,
        wordId,
      });
    } else {
      saveWord({
        userId: user.id,
        wordId,
      });
    }
  };
  return showText ? (
    <button
      type="button"
      onClick={handleSaveWord}
      aria-disabled={isPending}
      className={`
        group
        relative
        overflow-hidden
        aria-disabled:cursor-not-allowed
        border border-primary
        text-primary
        bg-white
        rounded-xl
        px-4 py-2
        font-semibold
        whitespace-nowrap
        transition-colors
        hover:bg-pink-300
        hover:text-white
        hover:border-none
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
        ${className}
  
      `}
    >
      <span className="whitespace-normal break-keep text-[16px] md:text-lg">
        {isSaved ? "수집 완료" : "단어 수집하기"}
      </span>

      <span aria-hidden="true">
        <span
          className="
            absolute
            top-1
            right-5
            size-2
            rounded-full
            bg-blue-200
            opacity-0
            scale-0
            transition-all
            duration-300
            group-hover:opacity-100
            group-hover:scale-100
            group-focus-visible:opacity-100
            group-focus-visible:scale-100
          "
        />

        <span
          className="
            absolute
            top-2/3
            right-1
            size-2.5
            -translate-y-1/2
            rounded-full
            bg-blue-200
            opacity-0
            scale-0
            transition-all
            duration-300
            delay-75
            group-hover:opacity-100
            group-hover:scale-100
            group-focus-visible:opacity-100
            group-focus-visible:scale-100
          "
        />

        <span
          className="
            absolute
            bottom-1
            left-1
            size-3.5
            rounded-full
            bg-blue-200
            opacity-0
            scale-0
            transition-all
            duration-300
            delay-150
            group-hover:opacity-100
            group-hover:scale-100
            group-focus-visible:opacity-100
            group-focus-visible:scale-100
          "
        />
      </span>
    </button>
  ) : (
    <button
      aria-label={isSaved ? "단어 수집 완료" : "단어 수집 하기"}
      className={`text-muted-foreground hover:text-primary ${className} aria-disabled:cursor-not-allowed `}
      onClick={handleSaveWord}
      aria-disabled={isPending}
    >
      <Bookmark className={`${isSaved ? "fill-primary text-primary " : ""}`} />
    </button>
  );
}
