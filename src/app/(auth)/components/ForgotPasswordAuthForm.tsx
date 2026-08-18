"use client";
import {
  forgotPasswordSchmas,
  forgotPasswordValue,
} from "../schemas/forgotpasswordSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetUserPassword } from "@/app/api/resetUserPassword";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ForgotPasswordAuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordValue>({
    resolver: zodResolver(forgotPasswordSchmas),
  });
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = async (data: forgotPasswordValue) => {
    try {
      await resetUserPassword(data.email);
      setIsEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-2xl bg-card h-120 w-full p-15">
      {isEmailSent ? (
        <div className="flex flex-col justify-center items-center">
          <h2>이메일을 확인해주세요.</h2>
          <p>비밀번호 재설정 링크를 이메일로 보냈습니다.</p>
          <p>
            <strong className="text-red-500">1시간 이내로</strong> 이메일을
            확인하세요.
          </p>
        </div>
      ) : (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userEmail" className="text-2xl font-semibold">
            이메일 입력
          </label>
          <input
            type="text"
            id="userEmail"
            className="bg-input h-12 rounded-2xl p-3"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className="bg-primary w-fit px-4 py-1 rounded-lg self-end font-semibold"
          >
            제출
          </button>
        </form>
      )}
    </div>
  );
}
