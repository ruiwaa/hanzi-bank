import { MySentence } from "@/types/DBTypes";
import MySentenceFormActionBtn from "./MysentenceFormActionBtn";
import Link from "next/link";

interface Props {
  sentence: MySentence;
}

export default function MySentenceCard({ sentence }: Props) {
  const MySentence = sentence.sentence;

  return (
    <li className="flex flex-col gap-2 border-b border-b-gray-200 last:border-b-0 py-3">
      <div className="flex flex-row items-center gap-2">
        <Link
          className="hover:text-primary"
          href={`/hsk-level-words/${sentence.hsk_words.hsk_level}/${sentence.hsk_words.id}`}
        >
          <h2 className="text-lg font-chinese font-bold">
            {sentence.hsk_words.word}
          </h2>
        </Link>
        <span className="bg-blue-100 text-primary px-1.5 py-1 rounded-lg self-center text-sm text-center font-semibold">
          HSK {sentence.hsk_words.hsk_level}급{" "}
        </span>
      </div>
      <p>[{sentence.hsk_words.pinyin}]</p>
      <p>{sentence.hsk_words.meanings[0].ko}</p>
      <div className="w-full bg-gray-100 p-3 rounded-md">
        <h3 className="font-chinese">{MySentence}</h3>
        <p>{sentence.meaning}</p>
      </div>
      <MySentenceFormActionBtn />
    </li>
  );
}
