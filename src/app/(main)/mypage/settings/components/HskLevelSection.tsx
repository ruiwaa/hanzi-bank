import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserLevel } from "@/hooks/useUpdateUserlevel";
import { UserLevel } from "@/types/DBTypes";
import { useState } from "react";

interface Props {
  level: UserLevel | null;
}

export default function HskLevelSection({ level }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const { mutate: updateLevel } = useUpdateUserLevel();

  const handleEdit = () => {
    setSelectedLevel(String(level?.hsk_level) ?? "");
    setIsEditing(true);
  };

  const handelSave = () => {
    if (!level) return;

    updateLevel(
      {
        id: level?.id,
        hsk_level: Number(selectedLevel),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleCancel = () => {
    setSelectedLevel("");
    setIsEditing(false);
  };
  return (
    <div>
      <p className="text-[16px] text-gray-500 mb-3 dark:text-white">
        학습 중인 HSK 급수를 선택하세요
      </p>
      <div className="flex flex-row gap-5">
        {isEditing ? (
          <>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="급수 선택" />
              </SelectTrigger>
              <SelectContent className="text-center">
                <SelectItem value="1">HSK 1급</SelectItem>
                <SelectItem value="2">HSK 2급</SelectItem>
                <SelectItem value="3">HSK 3급</SelectItem>
                <SelectItem value="4">HSK 4급</SelectItem>
                <SelectItem value="5">HSK 5급</SelectItem>
                <SelectItem value="6">HSK 6급</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-row gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white px-2 py-1 rounded-xl font-semibold"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handelSave}
                className="bg-green-400 text-white px-2 py-1 rounded-xl font-semibold"
              >
                저장
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="flex-1 font-semibold">HSK {level?.hsk_level} 급</p>
            <button
              type="button"
              onClick={handleEdit}
              className=" bg-green-500 text-white px-2 py-1 rounded-lg font-bold text-[15px]"
            >
              급수 변경
            </button>
          </>
        )}
      </div>
    </div>
  );
}
