"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Lock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signupFormValues, signupSchema } from "../schemas/signupSchemas";
import { signup } from "../api/signup";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(signupSchema) });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const router = useRouter();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const onSubmit = async (data: signupFormValues) => {
    try {
      const result = await signup({
        email: data.email,
        password: data.password,
        hskLevel: data.hskLevel,
      });

      if (result) router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full  max-w-md h-150 flex  flex-col p-8 gap-3 rounded-2xl shadow-lg"
    >
      <h2 className="font-bold text-xl">회원가입</h2>
      <span className="text-sm  text-gray-500">
        중단어 창고에 오신 것을 환영합니다.
      </span>

      <div className="space-y-2 w-full">
        <label htmlFor="userEmail" className="sr-only">
          이름(닉네임)
        </label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
            aria-hidden
          />
          <input
            type="email"
            id="userEmail"
            placeholder="사용자 이메일"
            aria-describedby="userName"
            className="w-full pl-12 text-gray-700 bg-gray-100  py-3  rounded-lg "
            {...register("email")}
          />
          <span id="userName" className="sr-only">
            이메일을 입력하세요.
          </span>
        </div>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2 w-full">
        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2  -translate-y-1/2  text-primary"
            aria-hidden
          />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="비밀번호"
            aria-describedby="userPassword"
            className="w-full pl-12 text-gray-700 bg-gray-100  py-3  rounded-lg "
            {...register("password")}
          />
          <button
            type="button"
            className="group  absolute right-3  top-1/2  -translate-y-1/2 text-gray-700"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <EyeOff aria-label="비밀번호 숨기기" />
            ) : (
              <Eye
                aria-label="
            비밀번호 표시"
              />
            )}
          </button>

          <span id="userPassword" className="sr-only">
            비밀번호를 입력하세요.
          </span>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 mt-2">{errors.password.message}</p>
        )}
      </div>
      <div className="w-full space-y-2">
        <label htmlFor="passwordCheck" className="sr-only">
          비밀번호 확인
        </label>

        <div className="relative">
          <Lock
            className="absolute  left-3 top-1/2  -translate-y-1/2  text-primary"
            aria-hidden
          />
          <input
            type={showPasswordConfirm ? "text" : "password"}
            id="passwordCheck"
            placeholder="비밀번호 확인"
            aria-describedby="userPasswordCheck"
            className="w-full pl-12 text-gray-700 bg-gray-100  py-3  rounded-lg "
            {...register("passwordConfirm")}
          />
          <button
            type="button"
            className="group  absolute right-3  top-1/2  -translate-y-1/2 text-gray-700"
            onClick={handleShowPasswordConfirm}
          >
            {showPasswordConfirm ? (
              <EyeOff aria-label="비밀번호 숨기기" />
            ) : (
              <Eye
                aria-label="
            비밀번호 표시"
              />
            )}
          </button>
          <span id="userPasswordCheck" className="sr-only">
            설정한 비밀번호를 한번 더 입력해주세요.
          </span>
        </div>
        {errors.passwordConfirm && (
          <p className="text-sm text-red-600 mt-2">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
      <div>
        <label id="hsk-level-label" className="sr-only">
          HSK 급수
        </label>
        <Controller
          name="hskLevel"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString() ?? ""}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger
                className="w-full"
                aria-labelledby="hsk-level-label"
              >
                <SelectValue placeholder="HSK 급수  선택" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Hsk 1급</SelectItem>
                <SelectItem value="2">Hsk 2급</SelectItem>
                <SelectItem value="3">Hsk 3급</SelectItem>
                <SelectItem value="4">Hsk 4급</SelectItem>
                <SelectItem value="5">Hsk 5급</SelectItem>
                <SelectItem value="6">Hsk 6급</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.hskLevel && (
          <p className="text-sm text-red-600 mt-2">{errors.hskLevel.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full  bg-primary  text-white  py-2 hover:bg-blue-400 hover:text-gray-300 font-semibold  rounded-lg"
      >
        가입 완료하기
      </button>
      <button
        onClick={() => window.history.back()}
        type="button"
        className="group w-full flex  flex-row  items-center justify-center  rounded-lg  p-1  border  border-muted-foreground text-sm text-muted-foreground font-semibold  hover:bg-accent"
      >
        <ArrowLeft className="transition-all duration-200 group-hover:-translate-x-2" />
        <span>뒤로 가기</span>
      </button>
      <span className="text-sm  text-gray-500 self-center">
        이미 계정이 있으신가요?{" "}
        <Link href={"/login"} className="text-primary">
          로그인하러가기
        </Link>
      </span>
    </form>
  );
}
