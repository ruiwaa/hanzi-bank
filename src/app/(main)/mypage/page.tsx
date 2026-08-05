"use client";
import { useProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { BookCheck, Notebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MypageGuide from "./components/MypageGuide";
import { useMyWordCount } from "@/hooks/useMyWordCount";

export default function Mypage() {
  const { user } = useSession();
  const { data: profile } = useProfile(user?.id);
  const { data: wordCount = 0 } = useMyWordCount(user?.id);

  return (
    <div className="max-w-full min-h-screen desktop-layout flex flex-col gap-3 px-5">
      <h1 className="text-2xl font-bold whitespace-nowrap mt-2">마이페이지</h1>
      <p className="text-gray-500 font-semibold">우리 같이 공부해요~</p>
      <div className="bg-white p-4 rounded-xl border border-gray-200 md:h-60 flex flex-col">
        <div className="flex flex-row gap-2 pb-3">
          <Image
            src={profile?.profile_image || "/profile.png"}
            alt="프로필 사진"
            width={60}
            height={60}
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg">{profile?.nickname} 👋</span>
            <span className="text-sm text-gray-400 font-semibold">
              HSK{profile?.hsk_level}급
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-3 h-full">
          <Link
            className="w-full flex flex-row bg-hover p-3 rounded-xl gap-2 items-center"
            href={"/myword"}
          >
            <div className="bg-primary text-white w-12 h-12 p-2 rounded-xl">
              <BookCheck aria-hidden="true" size={30} />
            </div>
            <div className="flex flex-col flex-1 whitespace-nowrap">
              <span className="text-sm">저장 단어</span>
              <span className="font-extrabold text-md md:text-3xl">
                {wordCount} 개
              </span>
            </div>
          </Link>
          <Link
            className="w-full flex flex-row bg-green-200 p-3 rounded-xl gap-2 items-center"
            href={"/myword"}
          >
            <div className="bg-green-500 text-white w-12 h-12 p-2 rounded-xl">
              <Notebook aria-hidden="true" size={30} />
            </div>
            <div className="flex flex-col flex-1 ">
              <span className="text-sm">작성 예문</span>
              <span className="font-extrabold text-md md:text-3xl">
                예문 개수 연동 필요
              </span>
            </div>
          </Link>
        </div>
      </div>
      <MypageGuide />
    </div>
  );
}
