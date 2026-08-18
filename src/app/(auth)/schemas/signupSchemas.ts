import { z } from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .trim()
      .email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
      ),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    hskLevel: z
      .number({ error: "Hsk 급수를 선택하세요." })
      .min(1, "Hsk 급수를 선택하세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type signupFormValues = z.infer<typeof signupSchema>;
