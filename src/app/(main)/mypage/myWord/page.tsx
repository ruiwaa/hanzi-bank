import MyWordSection from "./components/MyWordSection";

export default function MyWord() {
  return (
    <div className="desktop-layout flex flex-col">
      <h1 className="text-2xl font-bold">나의 단어</h1>
      <MyWordSection />
    </div>
  );
}
