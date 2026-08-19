"use client";

import { ArrowLeft, EyeIcon, EyeOff, Lock, LockIcon, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "../schemas/loginSchemas";
import { login } from "../../api/login";
import ResetButton from "./ResetButton";
import { toast } from "sonner";
import { fetchUser } from "@/app/api/fetchUser";
import ForgotPasswordSection from "./ForgotPasswordSection";
import { loginWithGoogle } from "@/app/api/loginWithGoogle";
import LogintoGoogle from "./LoginToGoogle";
import Link from "next/link";
import Image from "next/image";
import UserGuide from "@/components/ui/UserGuilde";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 이전 로그인 상태 초기화
  useEffect(() => {
    reset();
  }, [reset]);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line react-hooks/incompatible-library
  const email = watch("email");
  const password = watch("password");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data.email.trim(), data.password);
      const user = await fetchUser(result.user.id);
      const nickName =
        user?.nickname ?? result.user.email?.split("@")[0] ?? "회원";
      toast.success(`${nickName}님, 어서오세요! 🙌`);

      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);

        if (error.message === "Invalid login credentials") {
          toast.error("이메일 또는 비밀번호가 올바르지 않습니다.");

          return;
        }
      }
      toast.error("로그인 중 오류가 발생했습니다. 다시 시도하세요.");
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <Link href="/">
        <Image
          src="/logo2.png"
          alt="홈으로 이동"
          width={250}
          height={200}
          priority
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background w-full  max-w-md  flex flex-col items-center p-8 shadow-lg  gap-3  rounded-2xl "
      >
        <div className="rounded-full bg-hover w-15 h-15 p-4 flex justify-center items-center">
          <Lock
            size={30}
            aria-hidden="true"
            className="text-primary dark:text-white"
          />
        </div>
        <h2 className="font-sans font-semibold text-primary">
          PORTFOLIO_PROJECT
        </h2>
        <h2 className="font-bold text-lg">로그인</h2>
        <div className="flex flex-col  gap-3  w-full items-center">
          <span className="text-sm text-gray-500 dark:text-gray-200">
            중단어 창고에 오신 것을 환영합니다.
          </span>
          <div className="space-y-2 w-full">
            <label htmlFor="userEmail" className="sr-only">
              이메일
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-hidden="true"
              />
              <input
                type="text"
                id="userEmail"
                placeholder="이메일을 입력하세요."
                aria-describedby="idHelp"
                className="w-full pl-12 text-gray-700 bg-gray-100  py-2  rounded-lg 
              "
                {...register("email")}
              />
              {email && (
                <ResetButton
                  onClick={() => setValue("email", "")}
                  text="작성 중인 이메일 초기화 하기"
                />
              )}
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
            <span id="idHelp" className="sr-only">
              이메일을 입력하세요.
            </span>
          </div>

          <div className="space-y-2  w-full">
            <label htmlFor="userPassword" className="sr-only">
              비밀번호
            </label>
            <div className="relative">
              <LockIcon
                className="absolute left-3  top-1/2 -translate-y-1/2 text-gray-500"
                aria-hidden="true"
              />
              <input
                id="userPassword"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                aria-describedby="passwordHelp"
                className="w-full pl-12 text-gray-700 bg-gray-100 py-2  rounded-lg"
                {...register("password")}
              />
              {password && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <EyeOff aria-label="비밀번호 숨기기" />
                  ) : (
                    <EyeIcon aria-label="비밀번호 표시" />
                  )}
                </button>
              )}
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
            <span id="passwordHelp" className="sr-only">
              비밀번호를 입력하세요.
            </span>
          </div>
          <button
            type="submit"
            className={`w-full rounded-lg  p-1 hover:bg-accent hover:text-gray-400
           bg-primary text-white font-semibold dark:bg-blue-600 aria-disabled:cursor-not-allowed`}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "로그인 중..." : "로그인 하기"}
          </button>
          <ForgotPasswordSection />
        </div>
        <div className="w-full flex items-center ">
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-3">또는</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>
        <LogintoGoogle
          onCLick={async () => {
            try {
              await loginWithGoogle();
            } catch (error) {
              console.error(error);
              toast.error("Google 로그인에 실패했습니다.");
            }
          }}
        />
        <button
          type="button"
          className="w-full rounded-lg  p-1 border  border-primary text-primary font-medium  hover:bg-accent dark:border-blue-600 dark:text-blue-600"
          onClick={() => router.push("/signup")}
        >
          회원가입
        </button>
        <button
          onClick={() => window.history.back()}
          type="button"
          className="group w-full flex  flex-row  items-center justify-center  rounded-lg  p-1  border  border-muted-foreground text-sm text-muted-foreground font-semibold  hover:bg-accent dark:text-gray-200"
        >
          <ArrowLeft className="transition-all duration-200 group-hover:-translate-x-2" />
          <span>뒤로 가기</span>
        </button>
        <UserGuide />
      </form>
    </div>
  );
}
