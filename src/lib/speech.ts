// Web Speech API를 사용하는 SpeechRecognition 객체를 생성한다.
// 브라우저마다 지원하는 생성자 이름이 다르므로
// 표준 API(SpeechRecognition)와 Chrome 전용 API(webkitSpeechRecognition)를 모두 확인한다.
export function createSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition ?? window.webkitSpeechRecognition;

  // Web Speech API를 지원하지 않는 브라우저인 경우
  // null을 반환하여 호출한 곳에서 예외 처리를 할 수 있도록 한다.
  if (!SpeechRecognition) {
    return null;
  }

  // SpeechRecognition 객체를 생성하여 반환한다.
  return new SpeechRecognition();
}
