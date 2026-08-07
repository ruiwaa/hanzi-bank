import {
  updateMySentence,
  UpdateMySentenceParams,
} from "@/app/api/updateMysentence";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateMySentence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateMySentenceParams) => updateMySentence(params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySentences"],
      });
      toast.success("예문이 수정되었습니다.");
    },
  });
}
