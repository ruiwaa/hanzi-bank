import { HskLevelWords } from "@/app/api/fetchAllHskLevelWords";
import SaveWordBtn from "@/components/ui/SaveWordBtn";
import { POS_KO_MAP } from "@/constants/posToKo";
import Link from "next/link";

interface Props {
  words: HskLevelWords;
}

export default async function DetailHskLevelList({ words }: Props) {
  return (
    <>
      {words.words.map((word) => (
        <li
          key={word.id}
          className=" hover:bg-taupe-100 border-b py-3 h-25 text-[12px]  md:text-[16px] border-gray-300 grid grid-cols-[1fr_1fr_2fr_1fr] md:grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] items-center justify-items-center gap-2 "
        >
          <Link
            href={`/hsk-level-words/${word.hsk_level}/${word.id}`}
            className="contents"
          >
            <h3 className="font-chinese font-semibold text-lg">{word.word}</h3>
            <span className="text-muted-foreground whitespace-nowrap">
              [ {word.pinyin} ]
            </span>
            <span className="md:whitespace-normal md:break-keep text-center">
              {word.meanings
                .map((meaning) => meaning.ko.replace(/\s*;\s*/g, ", "))
                .join(", ")}
            </span>
            <span className="hidden md:break-keep whitespace-normal md:block text-center">
              {word.pos
                .map((pos) => POS_KO_MAP[pos] ?? pos)
                .slice(0, 3)
                .join(", ")}
            </span>
            <span className=" hidden md:block">{word.hsk_level} 급</span>
          </Link>
          <SaveWordBtn />
        </li>
      ))}
    </>
  );
}
