"use client";
import { useProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import ProfileSection from "./ProfileSection";
import HskLevelSection from "./HskLevelSection";
import DeleteAccountSection from "./DeleteAccoutSection";
import ResetPasswordSection from "../../../../(auth)/resetPassword/components/ResetPasswordSection";

export default function SettingsSection() {
  const { user } = useSession();
  const { data: profile } = useProfile(user?.id);

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full bg-card rounded-lg p-5 border border-gray-100 flex flex-col md:flex-row gap-5 md:items-center">
        <h2 className="font-bold text-xl self-start">프로필</h2>
        <ProfileSection profile={profile} />
      </div>
      <div className="w-full bg-card rounded-lg p-5 border border-gray-100 flex flex-col gap-3 ">
        <h2 className="font-bold text-xl self-start">HSK 급수 변경</h2>
        <HskLevelSection level={profile} />
      </div>
      <div className="w-full bg-card rounded-lg p-5 border border-gray-100 flex flex-col gap-3">
        <h2 className="font-extrabold text-xl self-start">비밀번호 재설정</h2>
        <ResetPasswordSection email={user?.email} />
      </div>
      <div className="w-full bg-card rounded-lg p-5 border border-gray-100 flex flex-col gap-3">
        <h2 className="font-extrabold text-xl self-start text-red-500">
          회원 탈퇴
        </h2>
        <DeleteAccountSection key={user?.id} />
      </div>
    </div>
  );
}
