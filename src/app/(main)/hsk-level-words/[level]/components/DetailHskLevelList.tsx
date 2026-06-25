import { HskLevelWords } from "@/app/api/fetchAllHskLevelWords";
import SaveWordBtn from "@/components/ui/SaveWordBtn";
import { POS_KO_MAP } from "@/constants/posToKo";

interface Props {
  words: HskLevelWords;
}

export default function DetailHskLevelList({ words }: Props) {
  return (
    <>
      {words.words.map((word) => (
        <li
          key={word.id}
          className=" border-b py-2 h-20  text-[12px] md:whitespace-nowrap md:text-[14px] border-gray-300 mb-2 grid grid-cols-[1fr_1fr_2fr_1fr] md:grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] items-center justify-items-center gap-2"
        >
          <h3 className="font-chinese">{word.word}</h3>
          <span className="text-muted-foreground">[ {word.pinyin} ]</span>
          <span className="md:whitespace-normal md:break-keep text-center">
            {word.meanings
              .map((meaning) => meaning.ko.replace(/\s*;\s*/g, ", "))
              .join(", ")}
          </span>
          <span className="hidden md:break-keep whitespace-normal md:block text-center">
            {word.pos.map((pos) => POS_KO_MAP[pos] ?? pos).join(", ")}
          </span>
          <span className=" hidden md:block">{word.hsk_level} 급</span>
          <SaveWordBtn />
        </li>
      ))}
    </>
  );
}
