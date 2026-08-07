import { deleteMySentence } from "@/app/api/deleteMySentence";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteMySentence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      sentenceId,
    }: {
      userId: string;
      sentenceId: string;
    }) => deleteMySentence(userId, sentenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySentences"],
      });
      toast.success("예문이 삭제되었습니다.");
    },
  });
}
