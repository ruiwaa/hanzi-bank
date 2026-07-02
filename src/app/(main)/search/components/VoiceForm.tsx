"use client";

import { searchValue } from "@/app/(auth)/schemas/searchSchemas";
import { VOICE_STATUS } from "@/constants/voiceStatus";
import { createSpeechRecognition } from "@/lib/speech";
import { Mic } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { UseFormSetFocus, UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<searchValue>;
  setFocus: UseFormSetFocus<searchValue>;
  language: "ko-KR" | "zh-CN";
  setLanguage: Dispatch<SetStateAction<"ko-KR" | "zh-CN">>;
}

type voiceStatus = keyof typeof VOICE_STATUS;

export default function VoiceForm({
  setValue,
  language,
  setLanguage,
  setFocus,
}: Props) {
  const [voiceStatus, setVoiceStatus] = useState<voiceStatus>("idle");
  const [isListening, setIsListening] = useState(false);

  // 현재 음성 인식 상태 값 저장하기
  const recognitionRef =
    useRef<ReturnType<typeof createSpeechRecognition>>(null);

  // 사용자가 직접 음성 인식을 종료한 것인지 확인을 위한 값 저장
  const isSpeechStop = useRef(false);

  // 음성 인식 결과 값을 받았는지 확인
  const hasResult = useRef(false);

  const handleVoiceSearch = () => {
    if (isListening) {
      isSpeechStop.current = true;
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
      hasResult.current = false;
      setIsListening(true);
      setVoiceStatus("listening");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      hasResult.current = true;

      // 인식된 텍스트 추출
      const transcript = event.results[0][0].transcript;

      //input 값 변경
      setValue("keyWord", transcript, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setFocus("keyWord");
      setVoiceStatus("success");
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;

      if (isSpeechStop.current) {
        setVoiceStatus("idle");
        return;
      }
      if (!hasResult.current) {
        setVoiceStatus("error");
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoiceStatus("error");
    };

    recognition.start();
  };

  return (
    <>
      <h3 className="text-muted-foreground font-semibold pb-3">음성 검색</h3>
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
        <p className="text-sm text-muted-foreground">
          선택한 언어로 말씀해 주세요.
        </p>
        <p className="text-sm text-muted-foreground">
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
