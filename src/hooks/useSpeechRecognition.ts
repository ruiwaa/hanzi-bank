import { VOICE_STATUS } from "@/constants/voiceStatus";
import { createSpeechRecognition } from "@/lib/speech";
import { useRef, useState } from "react";

interface Props {
  language: "ko-KR" | "zh-CN";
  onResult: (text: string) => void;
}
type voiceStatus = keyof typeof VOICE_STATUS;

export function useSpeechRecognition({ language, onResult }: Props) {
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
      onResult(transcript);
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

  return {
    isListening,
    voiceStatus,
    handleVoiceSearch,
  };
}
