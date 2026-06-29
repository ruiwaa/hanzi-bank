"use client";

import { searchValue } from "@/app/(auth)/schemas/searchSchemas";
import { Mic } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<searchValue>;
  language: "ko-KR" | "zh-CN";
  setLanguage: Dispatch<SetStateAction<"ko-KR" | "zh-CN">>;
}

export default function VoiceForm({ setValue, language, setLanguage }: Props) {
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 검색을 지원하지 않습니다.");
      return;
    }

    // 음성 인식 객체 설정
    const recognition = new SpeechRecognition();
    recognition.lang = language;

    // 말하는 중간 결과 말고, 말이 끝난 최종 결과만 찾게 하기
    recognition.interimResults = false;

    //음성 인식 결과 후보 개수
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // 인식된 텍스트 추출
      const transcript = event.results[0][0].transcript;

      //input 값 변경
      setValue("keyWord", transcript, {
        shouldValidate: true,
        shouldDirty: true,
      });
    };

    recognition.start();
  };

  return (
    <>
      <h3 className="text-muted-foreground font-semibold">음성 검색</h3>
      <div>
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
        <button onClick={handleVoiceSearch}>
          <Mic aria-label="음성 검색" />
        </button>
      </div>
    </>
  );
}
