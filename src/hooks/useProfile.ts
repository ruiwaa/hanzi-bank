import { getUserProfile } from "@/app/api/getUserProfile";
import { useQuery } from "@tanstack/react-query";

export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("userId가 없습니다.");
      }
      return getUserProfile(userId);
    },
    enabled: !!userId,
  });
}
