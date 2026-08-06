import { getMyWords, GetMyWordsParams } from "@/app/api/getMyWords";
import { useQuery } from "@tanstack/react-query";

export function useMyWords(params: GetMyWordsParams) {
  return useQuery({
    queryKey: ["myWords", params],
    enabled: !!params.userId,
    queryFn: () => getMyWords(params),
  });
}
