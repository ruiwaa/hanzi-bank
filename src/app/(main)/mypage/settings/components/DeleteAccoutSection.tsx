import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { useState } from "react";

export default function DeleteAccountSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteAccount } = useDeleteAccount();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    deleteAccount();
  };

  return (
    <div className="flex flex-row gap-2">
      <p className="text-gray-500 text-[16px] flex-1">
        회원 탈퇴 시 데이터가 삭제되며, 해당 계정은 복구할 수 없습니다.
      </p>
      <button
        type="button"
        className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg text-[15px]"
        onClick={handleModalOpen}
      >
        회원 탈퇴하기
      </button>
      <ConfirmModal
        open={isModalOpen}
        title="회원 탈퇴"
        description="회원 탈퇴 시 저장한 단어와 예문을 포함한 모든 데이터가 삭제되며, 복구할 수 없습니다. 정말 탈퇴하시겠습니까?"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
