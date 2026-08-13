"use client";

import { searchValue } from "@/app/(auth)/schemas/searchSchemas";
import { VOICE_STATUS } from "@/constants/voiceStatus";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Mic } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetFocus, UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<searchValue>;
  setFocus: UseFormSetFocus<searchValue>;
  language: "ko-KR" | "zh-CN";
  setLanguage: Dispatch<SetStateAction<"ko-KR" | "zh-CN">>;
}

export default function VoiceForm({
  setValue,
  language,
  setLanguage,
  setFocus,
}: Props) {
  const { isListening, voiceStatus, handleVoiceSearch } = useSpeechRecognition({
    language,
    onResult: (text) => {
      setValue("keyWord", text, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setFocus("keyWord");
    },
  });

  return (
    <>
      <h3 className="text-muted-foreground font-semibold pb-3 dark:text-blue-300">
        음성 검색
      </h3>
      <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-row gap-2">
          <label htmlFor="korean">한국어</label>
          <input
            type="radio"
            name="language"
            id="korean"
            checked={language === "ko-KR"}
            onChange={() => setLanguage("ko-KR")}
          />
          <label htmlFor="chinese">중국어</label>
          <input
            type="radio"
            name="language"
            id="chinese"
            checked={language == "zh-CN"}
            onChange={() => setLanguage("zh-CN")}
          />
        </div>
        <p className="text-sm text-muted-foreground dark:text-white">
          선택한 언어로 말씀해 주세요.
        </p>
        <p className="text-sm text-muted-foreground dark:text-white">
          해당 언어 외의 언어로 검색할 시, 음성 인식 정확도가 떨어질 수
          있습니다.
        </p>
        <button
          type="button"
          onClick={handleVoiceSearch}
          aria-label={isListening ? "음성 검색 종료" : "음성 검색 시작"}
        >
          <Mic
            className={`bg-blue-200 rounded-full p-3 
             ${isListening ? "text-red-500" : "text-primary"} 
            `}
            size={50}
          />
        </button>
        {
          <p
            className={`${VOICE_STATUS[voiceStatus].className} px-10 py-1 rounded-2xl flex`}
            aria-live="polite"
          >
            {VOICE_STATUS[voiceStatus].text}
            {voiceStatus === "listening" && (
              <span className="ml-1 inline-flex text-xl" aria-hidden="true">
                <span className="animate-pulse " aria-hidden="true">
                  .
                </span>
                <span
                  className="animate-pulse [animation-delay:0.2s]"
                  aria-hidden="true"
                >
                  .
                </span>
                <span
                  className="animate-pulse [animation-delay:0.4s]"
                  aria-hidden="true"
                >
                  .
                </span>
              </span>
            )}
          </p>
        }
      </div>
    </>
  );
}
