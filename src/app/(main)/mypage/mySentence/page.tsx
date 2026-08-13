import MySentenceSection from "./components/MySentenceSection";

export default function MySentence() {
  return (
    <div className="desktop-layout flex flex-col gap-1 p-5">
      <h1 className="text-2xl font-bold">나의 예문</h1>
      <p className="text-gray-500 text-sm dark:text-white">
        내가 작성한 예문를 확인 할 수 있어요.
      </p>
      <MySentenceSection />
    </div>
  );
}
