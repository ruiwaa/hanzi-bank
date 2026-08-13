import MyWordSection from "./components/MyWordSection";

export default function MyWord() {
  return (
    <div className="desktop-layout flex flex-col gap-1 p-5">
      <h1 className="text-2xl font-bold">나의 단어</h1>
      <p className="text-gray-500 text-sm dark:text-white">
        내가 저장한 단어를 확인 할 수 있어요.
      </p>
      <MyWordSection />
    </div>
  );
}
