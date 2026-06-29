export const VOICE_STATUS = {
  idle: {
    text: "음성 검색을 시작해주세요.",
    className: "bg-muted-foreground text-white",
  },
  listening: {
    text: "🎤 음성을 듣고 있습니다",
    className: "bg-blue-500 font-medium text-white",
  },
  processing: {
    text: "🔄 음성을 분석하고 있습니다...",
    className: "bg-amber-500 font-medium text-white",
  },
  success: {
    text: "✅ 음성 인식이 완료되었습니다.",
    className: "bg-green-500 font-medium text-white",
  },
  fail: {
    text: "❌ 음성을 인식하지 못했습니다.",
    className: "bg-red-500 font-medium text-white",
  },
} as const;

export type VoiceStatus = keyof typeof VOICE_STATUS;
