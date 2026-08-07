import { getMySentenceCount } from "@/app/api/getMySentenceCount";
import { useQuery } from "@tanstack/react-query";

export function useMySentenceCount(userId?: string) {
  return useQuery({
    queryKey: ["mySentenceCount", userId],
    queryFn: () => getMySentenceCount(userId!),
    enabled: !!userId,
  });
}
