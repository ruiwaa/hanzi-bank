"use client";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { MouseEvent, useState } from "react";

export default function HskLevelCardList() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const handleMoveLevelPage = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedLevel(Number(e.currentTarget.value));
    console.log(e.currentTarget.value);
  };
  return (
    <>
      {HSK_LEVELS.map((levels) => (
        <button
          value={levels.level}
          type="button"
          key={levels.level}
          className={`rounded-xl bg-input p-2 w-25  hover:bg-blue-200 ${selectedLevel === levels.level ? "bg-primary" : "false"}`}
          onClick={handleMoveLevelPage}
          aria-pressed={selectedLevel === levels.level}
        >
          {levels.label}
        </button>
      ))}
    </>
  );
}
