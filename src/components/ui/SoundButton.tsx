"use client";

import { Volume2Icon } from "lucide-react";

interface Props {
  text: string;
  size?: number;
  width?: number;
  height?: number;
  ariaLabel: string;
}

export default function SoundButton({
  text,
  size = 20,
  width = 35,
  height = 35,
  ariaLabel,
}: Props) {
  const handleSpeak = () => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();

    const chineseVoice =
      voices.find((voice) => voice.name === "Tingting") ??
      voices.find((voice) => voice.lang === "zh-CN");

    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      aria-label={ariaLabel}
      className="flex items-center justify-center rounded-full bg-blue-100 text-primary transition-colors hover:bg-green-200 hover:text-green-500"
      style={{
        width,
        height,
      }}
    >
      <Volume2Icon size={size} />
    </button>
  );
}
