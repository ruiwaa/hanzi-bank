import { getMyWords } from "@/app/api/getMyWords";
import { useQuery } from "@tanstack/react-query";

export function useMyWords(userId?: string) {
  return useQuery({
    queryKey: ["myWords", userId],
    enabled: !!userId,
    queryFn: () => {
      if (!userId) throw new Error("userId가 없습니다.");

      return getMyWords(userId);
    },
  });
}
