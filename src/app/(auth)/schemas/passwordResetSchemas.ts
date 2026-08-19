import z from "zod";

export const passwordResetSchemas = z
  .object({
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
      ),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type passwordResetValues = z.infer<typeof passwordResetSchemas>;
