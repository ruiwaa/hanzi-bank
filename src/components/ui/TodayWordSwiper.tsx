"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TodayWords } from "@/app/api/fetchTodayWords";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SaveWordBtn from "./SaveWordBtn";
import MovetoWordDetails from "./MovetoWordDetails";

interface Props {
  words: TodayWords[];
}

export default function TodayWordsSwiper({ words }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="relative h-80">
      <Swiper
        className="h-full "
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        a11y={true}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {words.map((word, index) => (
          <SwiperSlide
            key={word.id}
            aria-hidden={activeIndex !== index}
            className="h-full"
          >
            <article className="flex flex-col gap-2 bg-white/70 p-3 rounded-2xl items-center h-full py-5 pb-10">
              {/* h3 링크 태그로 감싸고 해당 단어 상세 페이지로 이동할 수 있도록 추후에 기능 추가 필요 */}
              {/* 단어, 예문 옆에 음성 지원 서비스 추가 필요 */}
              <h3 className="font-chinese font-bold text-3xl">{word.word}</h3>
              <span className="font-semibold">{`[ ${word.pinyin} ]`}</span>
              <span className="text-lg">{word.meanings[0].ko}</span>
              <h4 className="sr-only">예문</h4>
              <span className="font-chinese text-xl">
                {word.word_examples[0].sentence}
              </span>
              <span>{word.word_examples[0].meaning}</span>
              <div className="flex justify-between mt-auto gap-5 ">
                <SaveWordBtn />
                <MovetoWordDetails />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => {
          swiperRef.current?.slidePrev();
        }}
        aria-label="이전 단어"
        className="text-primary absolute left-0 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronLeft aria-hidden="true" size={30} />
      </button>
      <button
        onClick={() => {
          swiperRef.current?.slideNext();
        }}
        aria-label="다음 단어"
        className="text-primary absolute right-0 top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronRight aria-hidden="true" size={30} />
      </button>
    </div>
  );
}
