import DeleteMySentenceBtn from "./DeleteMySentenceBtn";
import ModifySentenceBtn from "./ModifySentenceBtn";

interface Props {
  onEdit: () => void;
}

export default function MySentenceFormActionBtn({ onEdit }: Props) {
  return (
    <div className="flex flex-row gap-3">
      <ModifySentenceBtn onEdit={onEdit} />
      <DeleteMySentenceBtn />
    </div>
  );
}
