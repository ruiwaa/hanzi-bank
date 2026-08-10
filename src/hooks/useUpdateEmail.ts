import { updateUserEmail } from "@/app/api/updateUserEmail";
import { useMutation } from "@tanstack/react-query";

export function useUpdateEmail() {
  return useMutation({
    mutationFn: updateUserEmail,
  });
}
