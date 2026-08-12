interface Props {
  isPending: boolean;
  handleSave: () => void;
  handleCancel: () => void;
}

export default function FormActionButton({
  isPending,
  handleSave,
  handleCancel,
}: Props) {
  return (
    <div className="flex flex-row gap-5 justify-center">
      <button
        type="button"
        onClick={handleCancel}
        className="border border-red-500 px-3 rounded-lg text-red-500 font-semibold dark:bg-red-500 dark:text-white"
      >
        취소
      </button>
      <button
        aria-disabled={isPending}
        onClick={() => {
          if (isPending) return;
          handleSave();
        }}
        className={`border border-primary px-3 rounded-lg text-primary font-semibold dark:bg-primary dark:text-white ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {isPending ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}
