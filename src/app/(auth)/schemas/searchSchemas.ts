import z from "zod";

export const searchSchema = z.object({
  keyWord: z
    .string()
    .trim()
    .min(1, "검색어를 입력해주세요.")
    .regex(
      /^[가-힣\u3400-\u4DBF\u4E00-\u9FFF\s.,!?~()\-_'"“”‘’·:;]+$/,
      "중국어 또는 한국어만 입력할 수 있습니다.",
    ),
});

export type searchValue = z.infer<typeof searchSchema>;
