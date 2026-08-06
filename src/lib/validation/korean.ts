interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateKorean(text: string): ValidationResult {
  const koreanRegex = /^[가-힣\s.,!?'"()]+$/;
  if (!text.trim()) {
    return {
      isValid: false,
      message: "한국어 의미를 입력하세요.",
    };
  }

  if (!koreanRegex.test(text)) {
    return {
      isValid: false,
      message: "한국어 의미만 입력해주세요.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}
