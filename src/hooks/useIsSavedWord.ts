import { getIsSaveWord } from "@/app/api/getIsSavedWord";
import { useQuery } from "@tanstack/react-query";

interface Params {
  userId?: string;
  wordId: string;
}

export function useIsSavedWord({ userId, wordId }: Params) {
  return useQuery({
    queryKey: ["savedWord", userId, wordId],
    queryFn: () =>
      getIsSaveWord({
        userId: userId!,
        wordId,
      }),
    enabled: !!userId,
  });
}
