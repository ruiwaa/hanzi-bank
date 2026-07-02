// TypeScript는 window.SpeechRecognition과
// window.webkitSpeechRecognition을 기본적으로 알지 못한다.
// 따라서 Window 인터페이스를 확장하여 타입 정보를 추가한다.
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// 전역 타입 선언 파일로 인식시키기 위한 export
export {};
