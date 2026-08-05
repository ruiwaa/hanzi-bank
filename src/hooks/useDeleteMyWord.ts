import { deleteMyWord } from "@/app/api/deleteMyWord";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteMyWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, wordId }: { userId: string; wordId: string }) =>
      deleteMyWord(userId, wordId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myWords"],
      });
      toast.success("단어가 삭제되었습니다.");
    },

    onError: (error) => {
      console.error(error);
      toast.error("단어 삭제에 실패했습니다. ");
    },
  });
}
