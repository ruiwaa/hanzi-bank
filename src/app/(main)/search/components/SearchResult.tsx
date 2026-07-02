import SaveWordBtn from "@/components/ui/SaveWordBtn";
import SoundButton from "@/components/ui/SoundButton";
import { POS_KO_MAP } from "@/constants/posToKo";
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
          className="flex flex-row gap-3 items-center w-full border border-olive-200 p-8 rounded-2xl bg-white hover:bg-blue-100/55 "
        >
          <Link
            href={`/hsk-level-words/${word.hsk_level}/${word.id}`}
            className="flex flex-row flex-1 gap-2 items-center"
          >
            <div className="flex flex-col  flex-1 gap-2">
              <h2 className="font-chinese text-xl font-semibold">
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
          <SaveWordBtn />
          <SoundButton size={30} />
        </li>
      ))}
    </ul>
  );
}
