import { saveWord } from "@/app/api/saveWord";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSaveWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, wordId }: { userId: string; wordId: string }) =>
      saveWord(userId, wordId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["myWords", variables.userId],
      });
      toast.success("단어 저장 성공");
    },
    onError: (error) => {
      console.error(error);
      toast.error("단어 저장 실패");
    },
  });
}
