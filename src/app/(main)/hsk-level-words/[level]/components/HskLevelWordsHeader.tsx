export default function HskLevelWordsHeader() {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] border-b mt-2 px-2 font-semibold text-muted-foreground">
      <p>단어</p>
      <p className="text-left">한어병음</p>
      <p className="text-center">의미</p>
      <p className="justify-self-center text-center">품사</p>
      <p className="justify-self-center text-center">급수</p>
      <p className="justify-self-center text-center">단어 수집</p>
    </div>
  );
}
