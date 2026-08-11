import { syncUserEmail } from "@/app/api/syncUserEmail";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSyncUserEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncUserEmail,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
