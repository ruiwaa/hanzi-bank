"use client";

import { useUpdateEmail } from "@/hooks/useUpdateEmail";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { UserProfile } from "@/types/DBTypes";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  profile: UserProfile | null;
}

export default function ProfileSection({ profile }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState({
    nickname: profile?.nickname ?? "",
  });
  const [newEmail, setNewEmail] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const { mutate: updateEmail } = useUpdateEmail();

  const handleEdit = () => {
    setEditingProfile({
      nickname: profile?.nickname ?? "",
    });

    setNewEmail("");
    setIsChangingEmail(false);
    setProfileImage(null);
    setIsEditing(true);
  };

  const handleEmailUpdate = () => {
    console.log("변경 요청 직전:", newEmail);
    if (!newEmail.trim()) {
      toast.error("새 이메일을 입력해주세요.");
      return;
    }

    if (newEmail === profile?.email) {
      toast.error("현재 이메일과 다른 이메일을 입력해주세요.");
      return;
    }

    updateEmail(
      { email: newEmail },
      {
        onSuccess: () => {
          toast.success("인증 메일을 발송했습니다.", {
            description: "새 이메일 주소의 받은편지함에서 인증을 완료해주세요.",
          });
        },
        onError: (error) => {
          toast.error("이메일 변경에 실패했습니다.");
          console.error(error);
        },
      },
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingEmail(false);
    setNewEmail("");
    setProfileImage(null);
  };

  const handleSave = () => {
    if (!profile) return;
    updateProfile(
      {
        id: profile.id,
        nickname: editingProfile.nickname,
        profileImage,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setProfileImage(null);
        },
      },
    );
  };

  return (
    <>
      {isEditing ? (
        <>
          <label htmlFor="profileImage" className="cursor-pointer">
            <Image
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : profile?.profile_image || "/profile.png"
              }
              alt="프로필 사진"
              width={100}
              height={100}
              className="rounded-full object-cover self-center"
            />
          </label>

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setProfileImage(file);
              }
            }}
          />

          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="userNickname" className="font-bold text-[16px]">
              닉네임
            </label>
            <input
              type="text"
              id="userNickname"
              value={editingProfile.nickname}
              onChange={(e) =>
                setEditingProfile((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              className="border border-gray-200 rounded-md p-1"
            />
            <label htmlFor="userEmail" className="font-bold text-[16px]">
              이메일
            </label>
            {isChangingEmail ? (
              <div className="flex flex-row gap-2">
                <input
                  type="email"
                  id="userEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-md p-1 "
                />

                <button
                  type="button"
                  onClick={handleEmailUpdate}
                  className="bg-blue-200 rounded-lg px-2 py-1 font-semibold"
                >
                  변경하기
                </button>
              </div>
            ) : (
              <div className="flex flex-row gap-2 items-center">
                <p
                  className="flex-1 border border-gray-100 rounded-lg p-1 aria-disabled:cursor-not-allowed"
                  aria-disabled={!isChangingEmail}
                >
                  {profile?.email}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setNewEmail(profile?.email ?? "");
                    setIsChangingEmail(true);
                  }}
                  className="bg-blue-200 rounded-lg px-2 py-1 font-semibold"
                >
                  이메일 변경
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Image
            src={profile?.profile_image || "/profile.png"}
            alt="프로필 사진"
            width={100}
            height={100}
            className="rounded-full self-center"
          />
          <div className="flex flex-col flex-1 cursor-not-allowed">
            <span className="font-bold text-[16px]">닉네임</span>
            <p className="border border-gray-100 rounded-lg p-1">
              {profile?.nickname}
            </p>

            <span className="font-bold text-[16px]">이메일</span>
            <p className="border border-gray-100 rounded-lg p-1">
              {profile?.email}
            </p>
          </div>
        </>
      )}
      {isEditing ? (
        <div className="flex flex-row gap-2 md:flex-col items-center">
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-primary text-white px-2 py-1 rounded-lg font-bold text-[15px]"
          >
            {isPending ? "저장 중..." : "저장하기"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full border border-red-500 text-red-500 p-1 rounded-lg font-bold text-[15px]"
          >
            취소
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleEdit}
          className="w-full md:w-fit bg-primary text-white px-2 py-1 rounded-lg font-bold text-[15px]"
        >
          수정하기
        </button>
      )}
    </>
  );
}
