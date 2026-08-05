import { getMyWordCount } from "@/app/api/getMyWordCount";
import { useQuery } from "@tanstack/react-query";

export function useMyWordCount(userId?: string) {
  return useQuery({
    queryKey: ["myWordCount", userId],
    queryFn: () => getMyWordCount(userId!),
    enabled: !!userId,
  });
}
