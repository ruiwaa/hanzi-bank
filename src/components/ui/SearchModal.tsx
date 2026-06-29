"use client";

import { searchSchema, searchValue } from "@/app/(auth)/schemas/searchSchemas";
import SearchForm from "@/app/(main)/search/components/SearchForm";
import VoiceForm from "@/app/(main)/search/components/VoiceForm";
import { useSearchModal } from "@/stores/searchModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SearchModal() {
  const { isOpen, close } = useSearchModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
    setValue,
  } = useForm<searchValue>({ resolver: zodResolver(searchSchema) });
  const [language, setLanguage] = useState<"ko-KR" | "zh-CN">("ko-KR");
  const router = useRouter();
  const onSubmit = (data: searchValue) => {
    close();
    router.push(`/search=${data.keyWord}`);
  };
  const handleReset = () => {
    resetField("keyWord");
  };
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
      onClick={close}
    >
      <div
        className="w-full md:m-auto lg:max-w-5xl bg-white rounded-2xl p-5 shadow-xl"
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
