import { HskLevelWords } from "@/app/api/fetchAllHskLevelWords";
import SaveWordBtn from "@/components/ui/SaveWordBtn";

interface Props {
  words: HskLevelWords;
}

export default function DetailHskLevelList({ words }: Props) {
  return (
    <>
      {words.words.map((word) => (
        <li
          key={word.id}
          className=" border-b py-2 h-15  text-[12px] md:whitespace-nowrap md:text-[14px] border-gray-300 mb-2 grid grid-cols-[1fr_1fr_2fr_1fr] md:grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] items-center justify-items-center gap-2"
        >
          <h3 className="font-chinese">{word.word}</h3>
          <span className="text-muted-foreground">[ {word.pinyin} ]</span>
          <span>{word.meanings.map((meaning) => meaning.ko).join(", ")}</span>
          <span className="hidden md:whitespace-normal md:block">
            {word.pos}
          </span>
          <span className=" hidden md:block">{word.hsk_level} 급</span>
          <SaveWordBtn />
        </li>
      ))}
    </>
  );
}
