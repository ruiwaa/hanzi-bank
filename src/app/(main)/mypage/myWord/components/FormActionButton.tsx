interface Props {
  handleSave: () => void;
  handleCancel: () => void;
}

export default function FormActionButton({ handleSave, handleCancel }: Props) {
  return (
    <div className="flex flex-row gap-5 justify-center">
      <button
        onClick={handleCancel}
        className="border border-red-500 px-3 rounded-lg"
      >
        취소
      </button>
      <button
        onClick={handleSave}
        className="border border-primary px-3 rounded-lg"
      >
        저장
      </button>
    </div>
  );
}
