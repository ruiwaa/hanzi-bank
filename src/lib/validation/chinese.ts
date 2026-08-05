interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateChinese(text: string): ValidationResult {
  const chineseRegex = /^[\u4E00-\u9FFF\s，。！？、；：“”‘’（）《》…]+$/;
  if (!text.trim()) {
    return {
      isValid: false,
      message: "중국어 예문을 입력해주세요.",
    };
  }

  if (!chineseRegex.test(text)) {
    return {
      isValid: false,
      message: "중국어 예문만 입력해주세요.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}
