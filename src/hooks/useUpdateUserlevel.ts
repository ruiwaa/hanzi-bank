import { updateUserLevel, UserHsklevel } from "@/app/api/updateUserLevel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateUserLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UserHsklevel) => updateUserLevel(params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      toast.success("급수 변경 완료");
    },
    onError: () => {
      toast.error("급수 변경 실패");
    },
  });
}
