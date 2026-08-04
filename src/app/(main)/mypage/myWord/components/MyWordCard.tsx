import SoundButton from "@/components/ui/SoundButton";
import { MyWord } from "@/types/DBTypes";
import Link from "next/link";

interface Props {
  word: MyWord;
}

export default function MyWordCard({ word }: Props) {
  const myWord = word.hsk_words;
  return (
    <li className="border-b border-b-gray-100 last:border-b-0">
      <div className="p-2 flex flex-col gap-1">
        <div className="flex flex-row gap-2 items-center">
          <Link
            href={`/hsk-level-words/${word.hsk_words.hsk_level}/${myWord.id}`}
          >
            <h2 className="text-lg font-extrabold">{myWord.word}</h2>
          </Link>
          <span className="bg-blue-100 text-primary p-1 rounded-lg self-center text-sm text-center font-semibold">
            HSK {myWord.hsk_level}급{" "}
          </span>
          <SoundButton
            text={myWord.word}
            ariaLabel={`${myWord.meanings[0].ko} 중국어 발음 듣기`}
            size={20}
            width={25}
            height={25}
          />
        </div>
        <p className="text-gray-500 text-md">[{word.hsk_words.pinyin}]</p>
        <p className="text-sm">{myWord.meanings[0].ko}</p>
      </div>
    </li>
  );
}
