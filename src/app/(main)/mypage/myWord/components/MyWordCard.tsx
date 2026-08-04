import { MyWord } from "@/types/DBTypes";

interface Props {
  word: MyWord;
}

export default function MyWordCard({ word }: Props) {
  return (
    <li>
      <p>{word.hsk_words.word}</p>
      <p>{word.hsk_words.pinyin}</p>
    </li>
  );
}
