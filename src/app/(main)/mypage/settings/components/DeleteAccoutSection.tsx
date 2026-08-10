export default function DeleteAccountSection() {
  return (
    <div className="flex flex-row gap-2">
      <p className="text-gray-500 text-[16px] flex-1">
        회원 탈퇴 시 데이터가 삭제되며, 해당 계정은 복구할 수 없습니다.
      </p>
      <button
        type="button"
        className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg text-[15px]"
      >
        회원 탈퇴하기
      </button>
    </div>
  );
}
