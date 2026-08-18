"use client";
import {
  passwordResetSchemas,
  passwordResetValues,
} from "@/app/(auth)/schemas/passwordResetSchemas";
import { updateUserPassword } from "@/app/api/updateUserPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<passwordResetValues>({
    resolver: zodResolver(passwordResetSchemas),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmit = async (data: passwordResetValues) => {
    try {
      const result = await updateUserPassword(data.password);
      if (result) {
        setIsResetSuccess(true);
      }
    } catch (error) {
      toast.error("비밀번호 재설정 실패");
      console.error(error);
    }
  };

  return isResetSuccess ? (
    <ResetPasswordSuccess
      onclik={() => {
        router.push("/");
      }}
    />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card w-1/2 h-100 flex flex-col p-5 rounded-2xl gap-3 border-2 border-accent"
    >
      <h2 className="text-xl font-bold text-center mt-5">비밀번호 재설정</h2>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="flex flex-col">
          <label htmlFor="resetPassword" className="font-semibold">
            새 비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="resetPassword"
              className="w-full h-8 bg-card-foreground/40 rounded-lg p-2"
              placeholder="비밀번호를 입력하세요"
              aria-describedby="passwordHelp"
              autoComplete="new-password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute top-1 right-0 -translate-x-1/2"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <EyeOff aria-label="비밀번호 숨기기" />
              ) : (
                <Eye aria-label="비밀번호 표시" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
            <span id="passwordHelp" className="sr-only">
              비밀번호를 입력하세요
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="resetPasswordConfirm" className="font-semibold">
            새 비밀번호 확인
          </label>
          <div className="relative">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              id="resetPasswordConfirm"
              className="w-full h-8 bg-card-foreground/40 rounded-lg p-2"
              placeholder="재설정할 비밀번호를 다시 한번 더 입력하세요"
              aria-describedby="passwordConfirmHelp"
              autoComplete="new-password"
              {...register("passwordConfirm")}
            />
            <button
              type="button"
              className="absolute top-1 right-0 -translate-x-1/2"
              onClick={handleShowPasswordConfirm}
            >
              {showPasswordConfirm ? (
                <EyeOff aria-label="비밀번호 숨기기" />
              ) : (
                <Eye aria-label="비밀번호 표시" />
              )}
            </button>
            {errors.passwordConfirm && (
              <p className="text-red-600 mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
            <span id="passwordConfirmHelp" className="sr-only">
              재설정할 비밀번호를 다시 한번 더 입력하세요
            </span>
          </div>
        </div>
        <button
          type="submit"
          aria-disabled={isSubmitting}
          className="h-8 bg-red-500/90 dark:border dark:border-red-500 rounded-lg font-semibold dark:hover:bg-red-500/40 dark:bg-transparent aria-disabled:cursor-not-allowed"
        >
          {isSubmitting ? "제출 중" : "비밀번호 변경"}
        </button>
      </div>
    </form>
  );
}
