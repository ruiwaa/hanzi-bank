export default function HskLevelWordsHeader() {
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr_1fr] md:grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] border-b mt-5 p-2 font-semibold text-muted-foreground gap-2 text-center">
      <p>단어</p>
      <p>한어병음</p>
      <p>의미</p>
      <p className="hidden md:block">품사</p>
      <p className="hidden md:block">급수</p>
      <p>단어 수집</p>
    </div>
  );
}
