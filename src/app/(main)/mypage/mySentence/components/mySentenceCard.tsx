import { MySentence, MySentenceWord } from "@/types/DBTypes";
import MySentenceFormActionBtn from "./MysentenceFormActionBtn";
import Link from "next/link";

interface Props {
  word: MySentenceWord;
  sentences: MySentence[];
}

export default function MySentenceCard({ word, sentences }: Props) {
  return (
    <li className="flex flex-col gap-2 border-b border-b-gray-200 last:border-b-0 py-3">
      <div className="flex flex-row items-center gap-2">
        <Link
          className="hover:text-primary"
          href={`/hsk-level-words/${word.hsk_level}/${word.id}`}
        >
          <h2 className="text-2xl font-chinese font-bold">{word.word}</h2>
        </Link>
        <span className="bg-blue-100 text-primary px-1.5 py-1 rounded-lg self-center text-sm text-center font-semibold">
          HSK {word.hsk_level}급{" "}
        </span>
      </div>
      <p>[{word.pinyin}]</p>
      <p>{word.meanings[0].ko}</p>
      <div className="flex flex-col gap-3">
        {sentences.map((sentence, index) => (
          <div
            key={sentence.id}
            className="flex flex-col gap-1 w-full bg-gray-100 p-3 rounded-md"
          >
            <h3 className="bg-blue-300 w-fit px-2  py-1 rounded-lg text-primary font-semibold">
              예문 {index + 1}{" "}
            </h3>
            <h4 className="font-chinese font-bold">{sentence.sentence}</h4>
            <p>{sentence.meaning}</p>

            <MySentenceFormActionBtn />
          </div>
        ))}
      </div>
    </li>
  );
}
