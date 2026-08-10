import { UserLevel } from "@/types/DBTypes";

interface Props {
  level: UserLevel | null;
}

export default function HskLevelSection({ level }: Props) {
  return (
    <div>
      <p className="text-[16px] text-gray-500">
        학습 중인 HSK 급수를 선택하세요
      </p>
      <div className="flex flex-row gap-2">
        <p className="flex-1">{level?.hsk_level} 급</p>
        {/* 급수 변경 클릭 시 셀렉트 컴포넌트로 변환 */}
        <button
          type="button"
          className=" bg-green-500 text-white px-2 py-1 rounded-lg font-bold text-[15px]"
        >
          급수 변경
        </button>
      </div>
    </div>
  );
}
