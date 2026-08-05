import { deleteMyWord } from "@/app/api/deleteMyWord";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteMyWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, wordId }: { userId: string; wordId: string }) =>
      deleteMyWord(userId, wordId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["myWords", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["savedWord", variables.userId, variables.wordId],
      });
      toast.success("단어가 삭제되었습니다.");
    },

    onError: (error) => {
      console.error(error);
      toast.error("단어 삭제에 실패했습니다. ");
    },
  });
}
