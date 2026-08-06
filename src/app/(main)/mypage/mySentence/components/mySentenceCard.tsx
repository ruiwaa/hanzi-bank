import MySentenceFormActionBtn from "./MysentenceFormActionBtn";

export default function MySentenceCard() {
  return (
    <li className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-lg font-chinese font-bold">단어</h2>
        <span>급수</span>
      </div>
      <p>한어병음</p>
      <p>단어 의미</p>
      <div className="w-full bg-gray-100 p-2 rounded-md">
        <h3 className="font-chinese">작성한 중국어 예문</h3>
        <p>예문 한국어 뜻</p>
      </div>
      <MySentenceFormActionBtn />
    </li>
  );
}
