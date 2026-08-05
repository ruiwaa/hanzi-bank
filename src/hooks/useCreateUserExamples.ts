import { createUserExample } from "@/app/api/createUserExamples";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateUserExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserExample,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userExamples", variables.wordId],
      });
      toast.success("예문이 저장되었습니다.");
    },

    onError: (error) => {
      console.error(error);
      toast.error("예문 저장에 실패했습니다.");
    },
  });
}
