import { useState } from "react";
import UserGuideInfoModal from "./UserGuildeInfo";

export default function UserGuide() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="border border-amber-400 w-full p-1 font-normal rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        포토폴리오 이용 안내
      </button>

      {isModalOpen && (
        <UserGuideInfoModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
