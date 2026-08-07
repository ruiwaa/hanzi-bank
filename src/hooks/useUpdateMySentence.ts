import {
  updateMySentence,
  UpdateMySentenceParams,
} from "@/app/api/updateMysentence";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMySentence() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateMySentenceParams) => updateMySentence(params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mySentences"],
      });
    },
  });
}
