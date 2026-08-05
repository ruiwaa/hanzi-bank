import { useState } from "react";
import ExampleInputSection from "./ExampleInputSection";
import FormActionButton from "./FormActionButton";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}
export default function ExampleForm({ onClose }: Props) {
  const [sentence, setSentence] = useState("");
  const [meaning, setMeaning] = useState("");
  const chineseRegex = /^[\u4E00-\u9FFF\s，。！？、；：“”‘’（）《》…]+$/;
  const koreanRegex = /^[가-힣\s.,!?'"()]+$/;

  const handleSave = () => {
    if (!sentence.trim()) {
      toast.error("중국어 예문을 입력하세요.");
      return;
    }

    if (!meaning.trim()) {
      toast.error("한국어 의미를 입력하세요.");
      return;
    }

    if (!chineseRegex.test(sentence)) {
      toast.error("중국어 예문만 입력해주세요.");
      return;
    }

    if (!koreanRegex.test(meaning)) {
      toast.error("한국어 의미만 입력해주세요.");
      return;
    }
    console.log({
      sentence,
      meaning,
    });
  };
  const handleCancel = () => {
    setSentence("");
    setMeaning("");
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
        onChange={setSentence}
      />
      <div className="border-b border-b-gray-300"></div>
      <ExampleInputSection
        id="meaning"
        title="한국어 의미 작성"
        placeholder="한국어로 에문의 의미를 작성하세요."
        value={meaning}
        onChange={setMeaning}
      />
      <FormActionButton handleSave={handleSave} handleCancel={handleCancel} />
    </div>
  );
}
