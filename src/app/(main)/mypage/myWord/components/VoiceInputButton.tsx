import { VOICE_STATUS } from "@/constants/voiceStatus";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface Props {
  language: "ko-KR" | "zh-CN";
  onResult: (text: string) => void;
}

export default function VoiceInputButton({ language, onResult }: Props) {
  const { isListening, voiceStatus, handleVoiceSearch } = useSpeechRecognition({
    language,
    onResult,
  });
  return (
    <>
      <button
        onClick={handleVoiceSearch}
        className="bg-primary w-full md:w-100 text-white px-2 py-1 rounded-lg self-center font-semibold"
      >
        {isListening ? "음성 입력 종료" : "음성 입력"}
      </button>
      <p
        className={`text-center rounded-lg ${VOICE_STATUS[voiceStatus].className}`}
        aria-live="polite"
      >
        {VOICE_STATUS[voiceStatus].text}
      </p>
    </>
  );
}
