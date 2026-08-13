import SoundButton from "@/components/ui/SoundButton";
import { MyWord } from "@/types/DBTypes";
import Link from "next/link";
import AddWordExample from "./AddWordExample";
import DeleteMyWord from "./DeleteMyWord";
import ExampleForm from "./ExampleForm";
import { useState } from "react";
import { useDeleteMyWord } from "@/hooks/useDeleteMyWord";

interface Props {
  userId: string;
  word: MyWord;
}

export default function MyWordCard({ userId, word }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const myWord = word.hsk_words;
  const { mutate, isPending } = useDeleteMyWord();

  const handleDelete = () => {
    mutate({
      userId: userId,
      wordId: myWord.id,
    });
  };
  return (
    <li className="border-b border-b-gray-100 last:border-b-0">
      <div className="p-2 flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <Link
            href={`/hsk-level-words/${word.hsk_words.hsk_level}/${myWord.id}`}
          >
            <h2 className="text-lg font-extrabold font-chinese hover:text-primary dark:text-white">
              {myWord.word}
            </h2>
          </Link>
          <span className="bg-blue-100 text-primary px-1.5 py-1 rounded-lg self-center text-sm text-center font-semibold dark:bg-blue-500 dark:text-white">
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
        <p className="text-gray-500 text-md dark:text-white">
          [{word.hsk_words.pinyin}]
        </p>
        <p className="text-sm">{myWord.meanings[0].ko}</p>
        <div className="flex flex-row gap-2">
          <AddWordExample onClick={() => setIsFormOpen(true)} />
          <DeleteMyWord handleDelete={handleDelete} isPending={isPending} />
        </div>
        {isFormOpen && (
          <ExampleForm
            wordId={myWord.id}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </li>
  );
}
