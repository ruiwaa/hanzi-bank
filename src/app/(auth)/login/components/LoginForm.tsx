"use client";

import { ArrowLeft, EyeIcon, EyeOff, Lock, LockIcon, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form className="bg-white w-full  max-w-md h-132 flex flex-col items-center p-8 shadow-lg  gap-3  rounded-2xl ">
      <div className="rounded-full bg-[var(--hover)] w-15 h-15 p-4 flex justify-center items-center">
        <Lock size={30} color="var(--primary)" aria-hidden />
      </div>
      <h2 className="font-bold  text-lg pt-2">로그인</h2>
      <div className="flex flex-col  gap-3  w-full items-center">
        <span className="text-sm text-gray-500">
          중단어 창고에 오신 것을 환영합니다.
        </span>
        {/* 이메일 규칙에  대한 설명이 필요함. */}
        <div className="space-y-2 w-full">
          <label htmlFor="userEmail" className="sr-only">
            이메일
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
            <input
              type="email"
              id="userEmail"
              placeholder="이메일을 입력하세요."
              aria-describedby="idHelp"
              className="w-full pl-12 text-gray-700 bg-gray-100  py-2  rounded-lg 
              "
            />
          </div>
          <span id="idHelp" className="sr-only">
            이메일을 입력하세요.
          </span>
        </div>
        {/* 비밀번호 규칙에 대한 설명이 필요함 */}
        <div className="space-y-2  w-full">
          <label htmlFor="userPassword" className="sr-only">
            비밀번호
          </label>
          <div className="relative">
            <LockIcon
              className="absolute left-3  top-1/2 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
            <input
              id="userPassword"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요."
              aria-describedby="passwordHelp"
              className="w-full pl-12 text-gray-700 bg-gray-100 py-2  rounded-lg"
            />
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
          </div>
          <span id="passwordHelp" className="sr-only">
            비밀번호를 입력하세요.
          </span>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg  p-1 hover:bg-accent hover:text-gray-400
           bg-primary text-white font-semibold"
        >
          로그인하기
        </button>
      </div>
      <div className="w-full flex items-center ">
        <div className="flex-1 border-t border-slate-200" />
        <span className="px-3">또는</span>
        <div className="flex-1 border-t border-slate-200" />
      </div>
      <button
        type="button"
        className="w-full rounded-lg  p-1 border  border-primary text-primary font-semibold  hover:bg-accent"
        onClick={() => router.push("/signup")}
      >
        회원가입
      </button>
      <button
        onClick={() => window.history.back()}
        type="button"
        className="group w-full flex  flex-row  items-center justify-center  rounded-lg  p-1  border  border-muted-foreground text-sm text-muted-foreground font-semibold  hover:bg-accent"
      >
        <ArrowLeft className="transition-all duration-200 group-hover:-translate-x-2" />
        <span>뒤로 가기</span>
      </button>
    </form>
  );
}
