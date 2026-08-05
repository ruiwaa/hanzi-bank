import { useState } from "react";
import ExampleInputSection from "./ExampleInputSection";
import FormActionButton from "./FormActionButton";
import { X } from "lucide-react";
import { validateChinese } from "@/lib/validation/chinese";
import { validateKorean } from "@/lib/validation/korean";
import { toast } from "sonner";
import { useCreateUserExample } from "@/hooks/useCreateUserExamples";
import { useSession } from "@/hooks/useSession";
import { useLoginModal } from "@/stores/loginModalStore";

interface Props {
  wordId: string;
  onClose: () => void;
}
export default function ExampleForm({ wordId, onClose }: Props) {
  const [sentence, setSentence] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentenceError, setSentenceError] = useState("");
  const [meaningError, setMeaningError] = useState("");
  const { user } = useSession();
  const { mutate, isPending } = useCreateUserExample();
  const { open } = useLoginModal();
  const handleSentenceChange = (value: string) => {
    setSentence(value);
    if (!value.trim()) {
      setSentenceError("");
      return;
    }
    const result = validateChinese(value);
    setSentenceError(result.message);
  };
  const handleMeaningChange = (value: string) => {
    setMeaning(value);
    if (!value.trim()) {
      setMeaningError("");
      return;
    }
    const result = validateKorean(value);
    setMeaningError(result.message);
  };

  const handleSave = async () => {
    const chineseResult = validateChinese(sentence);
    const koreanResult = validateKorean(meaning);
    if (!chineseResult.isValid) {
      toast.error(chineseResult.message);
      return;
    }
    if (!koreanResult.isValid) {
      toast.error(koreanResult.message);
      return;
    }

    if (!user) {
      open();
      return;
    }

    mutate(
      {
        userId: user.id,
        wordId,
        sentence,
        meaning,
      },
      {
        onSuccess: () => {
          setSentence("");
          setMeaning("");
          setSentenceError("");
          setMeaningError("");

          onClose();
        },
      },
    );
  };

  const handleCancel = () => {
    setSentence("");
    setMeaning("");
    setSentenceError("");
    setMeaningError("");
    onClose();
  };

  return (
    <div className="flex flex-col justify-center gap-2 border border-gray-300 p-3 rounded-md">
      <div className="self-end">
        <button
          onClick={handleCancel}
          aria-label="예문 작성 폼 닫기"
          title="예문 폼 닫기"
          className="cursor-pointer hover:bg-red-400/40 hover:rounded-lg"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <ExampleInputSection
        id="sentence"
        title="중국어 예문 작성"
        placeholder="중국어로 예문을 작성하세요."
        value={sentence}
        error={sentenceError}
        onChange={handleSentenceChange}
      />
      <div className="border-b border-b-gray-300"></div>
      <ExampleInputSection
        id="meaning"
        title="한국어 의미 작성"
        placeholder="한국어로 에문의 의미를 작성하세요."
        value={meaning}
        error={meaningError}
        onChange={handleMeaningChange}
      />
      <FormActionButton
        isPending={isPending}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
}
