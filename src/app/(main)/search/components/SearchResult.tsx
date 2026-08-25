import SaveWordBtn from "@/components/ui/SaveWordBtn";
import SoundButton from "@/components/ui/SoundButton";
import { POS_KO_MAP } from "@/constants/posToKo";
import { chineseFont } from "@/lib/fonts";
import { HskWord } from "@/types/DBTypes";
import Link from "next/link";

interface Props {
  words: HskWord[];
}
export default function SearchResult({ words }: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {words.map((word) => (
        <li
          key={word.id}
          className="flex flex-row gap-3 items-center w-full border border-olive-200 p-8 rounded-2xl bg-card hover:bg-blue-100/55 "
        >
          <Link
            href={`/hsk-level-words/${word.hsk_level}/${word.id}`}
            className="flex flex-row flex-1 gap-2 items-center"
          >
            <div className="flex flex-col  flex-1 gap-2">
              <h2
                className={`${chineseFont.variable} font-chinese text-xl font-bold`}
              >
                {word.word}{" "}
                <span className="font-medium pl-2 text-muted-foreground text-sm">
                  [ {word.pinyin} ]
                </span>
              </h2>

              <p className="leading-none">{word.meaning_ko}</p>
            </div>

            {word.pos.slice(0, 2).map((p) => (
              <span
                key={p}
                className="bg-mauve-200 text-gray-500 p-1 rounded-xl"
              >
                {POS_KO_MAP[p] ?? p}
              </span>
            ))}
          </Link>
          <SaveWordBtn wordId={word.id} />
          <SoundButton
            text={word.word}
            size={30}
            ariaLabel={`${word.meaning_ko} 중국어 발음 듣기`}
          />
        </li>
      ))}
    </ul>
  );
}
