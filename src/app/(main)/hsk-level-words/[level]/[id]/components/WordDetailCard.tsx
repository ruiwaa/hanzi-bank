import SaveWordBtn from "@/components/ui/SaveWordBtn";
import SoundButton from "@/components/ui/SoundButton";
import { POS_KO_MAP } from "@/constants/posToKo";
import { HskWord, WordExample } from "@/types/DBTypes";

export interface HskWordDetail extends HskWord {
  word_examples: WordExample[];
}
interface Props {
  word: HskWordDetail;
}

export default function WordDetailCard({ word }: Props) {
  return (
    <>
      <div className="flex flex-row justify-between gap-3 border-b border-gray-200 pb-5">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-row gap-3 items-center">
            <h3 className="text-4xl font-bold text-primary font-chinese whitespace-nowrap">
              {word.word}
            </h3>
            <SoundButton size={40} />
          </div>
          <span className="text-xl font-semibold mt-2">[{word.pinyin}]</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="pr-2 ">
              {word.meanings.map((meaning) => meaning.ko).join(", ")}
            </span>
            {word.pos.slice(0, 3).map((p) => (
              <span
                key={p}
                className="text-muted-foreground rounded-full bg-gray-200 px-2 py-1 text-sm md:text-[15px]"
              >
                {POS_KO_MAP[p]}
              </span>
            ))}
          </div>
        </div>
        <SaveWordBtn showText={true} className="h-20 w-30 self-center " />
      </div>
      <ul>
        {word.meanings.map((meaning, index) => (
          <div
            key={word.word_examples[index].id}
            className="flex flex-col pt-3"
          >
            <li key={index}>
              <div className="flex flex-col mb-3">
                <span className="text-primary font-semibold mb-2">
                  {word.meanings.length > 1 && `의미 ${index + 1} `}
                </span>
                <div className="flex flex-row items-center gap-2 mb-3">
                  <span className="rounded-xl bg-blue-500 text-white py-1 px-3 text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-[18px]">
                    {meaning.ko}
                  </span>
                </div>
                {word.word_examples[index] && (
                  <div
                    key={index}
                    className="flex flex-col gap-1 border border-border mx-6 p-5 rounded-2xl"
                  >
                    <div className="flex flex-row gap-3">
                      <SoundButton size={30} />
                      <div>
                        <p className="font-chinese font-semibold">
                          {word.word_examples[index].sentence}
                        </p>
                        <p className="text-muted-foreground">
                          [{word.word_examples[index].sentence_pinyin}]
                        </p>
                        <p>{word.word_examples[index].meaning}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}
