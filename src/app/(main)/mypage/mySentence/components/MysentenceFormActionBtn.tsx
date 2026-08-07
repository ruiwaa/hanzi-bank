import DeleteMySentenceBtn from "./DeleteMySentenceBtn";
import ModifySentenceBtn from "./ModifySentenceBtn";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function MySentenceFormActionBtn({ onEdit, onDelete }: Props) {
  return (
    <div className="flex flex-row gap-3">
      <ModifySentenceBtn onEdit={onEdit} />
      <DeleteMySentenceBtn onDelete={onDelete} />
    </div>
  );
}
