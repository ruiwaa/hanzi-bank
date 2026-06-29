"use client";

import { searchValue } from "@/app/(auth)/schemas/searchSchemas";
import { VOICE_STATUS } from "@/constants/voiceStatus";
import { createSpeechRecognition } from "@/lib/speech";
import { Mic } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<searchValue>;
  language: "ko-KR" | "zh-CN";
  setLanguage: Dispatch<SetStateAction<"ko-KR" | "zh-CN">>;
}

type voiceStatus = keyof typeof VOICE_STATUS;

export default function VoiceForm({ setValue, language, setLanguage }: Props) {
  const [voiceStatus, setVoiceStatus] = useState<voiceStatus>("idle");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setVoiceStatus("idle");
      return;
    }

    // 음성 인식 객체 설정
    const recognition = createSpeechRecognition();
    if (!recognition) {
      alert("이 브라우저는 음성 검색을 지원하지 않습니다.");
      return;
    }
    recognitionRef.current = recognition;

    recognition.lang = language;

    // 말하는 중간 결과 말고, 말이 끝난 최종 결과만 찾게 하기
    recognition.interimResults = false;

    //음성 인식 결과 후보 개수
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus("listening");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setVoiceStatus("processing");
      // 인식된 텍스트 추출
      const transcript = event.results[0][0].transcript;

      //input 값 변경
      setValue("keyWord", transcript, {
        shouldValidate: true,
        shouldDirty: true,
      });
    };
    recognition.onend = () => {
      setIsListening(false);
      setVoiceStatus("success");
      recognitionRef.current = null;
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoiceStatus("fail");
      recognitionRef.current = null;
    };

    recognition.start();
  };

  return (
    <>
      <h3 className="text-muted-foreground font-semibold pb-3">음성 검색</h3>
      <div className="flex flex-col gap-5 items-center">
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
        <button
          onClick={handleVoiceSearch}
          aria-label={isListening ? "음성 검색 종료" : "음성 검색 시작"}
        >
          <Mic
            className={`bg-blue-200 rounded-full p-3 
              isListening
                ? "text-red-500"
                : "text-primary"
            `}
            size={50}
          />
        </button>
        {
          <p
            className={`${VOICE_STATUS[voiceStatus].className} px-10 py-1 rounded-2xl flex`}
          >
            {VOICE_STATUS[voiceStatus].text}
            {voiceStatus === "listening" && (
              <span className="ml-1 inline-flex text-xl">
                <span className="animate-pulse ">.</span>
                <span className="animate-pulse [animation-delay:0.2s]">.</span>
                <span className="animate-pulse [animation-delay:0.4s]">.</span>
              </span>
            )}
          </p>
        }
      </div>
    </>
  );
}
