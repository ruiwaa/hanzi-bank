import { getMySentenceCount } from "@/app/api/getMySentence";
import { useQuery } from "@tanstack/react-query";

export function useMySentenceCount(userId?: string) {
  return useQuery({
    queryKey: ["mySentenceCount", userId],
    queryFn: () => getMySentenceCount(userId!),
    enabled: !!userId,
  });
}
