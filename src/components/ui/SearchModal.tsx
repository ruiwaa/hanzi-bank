"use client";

import { searchSchema, searchValue } from "@/app/(auth)/schemas/searchSchemas";
import SearchForm from "@/app/(main)/search/components/SearchForm";
import VoiceForm from "@/app/(main)/search/components/VoiceForm";
import { useSearchModal } from "@/stores/searchModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function SearchModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpen, close } = useSearchModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
    setValue,
    setFocus,
  } = useForm<searchValue>({ resolver: zodResolver(searchSchema) });
  const [language, setLanguage] = useState<"ko-KR" | "zh-CN">("ko-KR");

  // 모달창 안에서만 초점 이동 가능하도록 구현
  useEffect(() => {
    if (isOpen) {
      setFocus("keyWord");
    }
  }, [isOpen, setFocus]);

  const router = useRouter();
  const onSubmit = (data: searchValue) => {
    close();
    router.push(`/search=${data.keyWord}`);
  };

  // 모달창 키보드 이벤트 연결
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    if (!modalRef.current) return;

    // input, radio, button
    const focusableElements =
      modalRef.current?.querySelectorAll<HTMLElement>("button, input");
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    if (focusableElements.length === 0) return;

    if (document.activeElement === firstEl && e.shiftKey) {
      e.preventDefault();
      lastEl.focus();
    }
    if (document.activeElement === lastEl && !e.shiftKey) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  // 검색어 입력칸 리셋 이벤트
  const handleReset = () => {
    resetField("keyWord");
  };
  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
      onClick={close}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* 이벤트 전파 방지하기 위해서 e.stopPropagation */}
      <div
        className="w-full md:m-auto lg:max-w-5xl bg-white rounded-2xl p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row md:justify-between">
            <h2 className="m-auto lg:m-0 font-bold">단어 검색</h2>
            <button onClick={close} aria-label="검색창 닫기">
              <X />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SearchForm
              register={register}
              errors={errors}
              control={control}
              reset={handleReset}
            />
            <div className="w-full flex items-center ">
              <div className="flex-1 border-t border-slate-200" />
              <span className="px-3 text-muted-foreground pt-3">또는</span>
              <div className="flex-1 border-t border-slate-200" />
            </div>
            <VoiceForm
              setValue={setValue}
              language={language}
              setLanguage={setLanguage}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
