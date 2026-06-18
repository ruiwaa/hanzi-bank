import { z } from "zod";
import { ko } from "zod/v4/locales";

// zod 메시지 출력 언어 설정
z.config(ko());

export const loginSchema = z.object({
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
