import { UserProfile } from "@/types/DBTypes";
import Image from "next/image";

interface Props {
  profile: UserProfile | null;
}

export default function ProfileSection({ profile }: Props) {
  return (
    <>
      <Image
        src={profile?.profile_image || "/profile.png"}
        alt="프로필 사진"
        width={100}
        height={100}
      />
      <div className="flex-1 flex flex-col gap-2">
        <span className="font-bold text-[16px]">닉네임</span>
        {/* input으로 대체해야 되는 부분 */}
        <p>{profile?.nickname}</p>
        <span className="font-bold text-[16px]">이메일</span>
        {/* input으로 대체해야 되는 부분 */}
        <p>{profile?.email}</p>
      </div>
      {/* 수정하기 버튼 누르면 저장하기로 변환 */}
      <button
        type="button"
        className="w-full md:w-fit bg-primary text-white px-2 py-1 rounded-lg font-bold text-[15px]"
      >
        수정하기
      </button>
    </>
  );
}
