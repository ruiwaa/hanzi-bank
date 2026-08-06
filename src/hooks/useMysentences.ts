import { GetMySentenceParams, getMySentences } from "@/app/api/getMySentences";
import { useQuery } from "@tanstack/react-query";

export function useMySentences(params: GetMySentenceParams) {
  return useQuery({
    queryKey: ["mySentences", params],
    enabled: !!params.userId,
    queryFn: () => getMySentences(params),
  });
}
