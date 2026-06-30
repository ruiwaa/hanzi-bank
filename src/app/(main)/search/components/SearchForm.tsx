"use client";
import { searchValue } from "@/app/(auth)/schemas/searchSchemas";
import { X } from "lucide-react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormResetField,
  useWatch,
} from "react-hook-form";

interface Props {
  register: UseFormRegister<searchValue>;
  errors: FieldErrors<searchValue>;
  control: Control<searchValue>;
  reset: UseFormResetField<searchValue>;
}

export default function SearchForm({
  register,
  errors,
  control,
  reset,
}: Props) {
  const searchWord = useWatch({ control, name: "keyWord" });
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-muted-foreground font-semibold">텍스트 검색</h3>
      <label htmlFor="textSearch" className="sr-only">
        텍스트 검색
      </label>
      <div className="flex flex-row gap-2 ">
        <div className="relative flex-1">
          <input
            id="textSearch"
            placeholder="찾으시는 단어를 검색해주세요."
            aria-describedby="textSearchHelp"
            className="bg-input p-2 rounded-xl w-full font-chinese"
            {...register("keyWord")}
          />
          {searchWord?.trim() && (
            <button
              onClick={() => reset("keyWord")}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              <X aria-label="검색어 초기화하히기" />
            </button>
          )}
        </div>
        {searchWord?.trim() && (
          <button
            type="submit"
            className="border-2 border-primary p-2 rounded-2xl hover:bg-primary hover:text-white font-semibold"
          >
            검색하기
          </button>
        )}
      </div>
      {errors.keyWord && (
        <p className="text-red-500">{errors.keyWord.message}</p>
      )}
      <span id="textSearchHelp" className="sr-only">
        찾으시는 단어를 입력해주세요.
      </span>
    </div>
  );
}
