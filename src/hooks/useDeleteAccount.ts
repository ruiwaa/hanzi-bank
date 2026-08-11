import { supabase } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useDeleteAccount() {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/account/delete", { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return response.json();
    },
    onSuccess: async () => {
      await supabase.auth.signOut();
      router.replace("/");
      toast.success("회원 탈퇴 성공");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
