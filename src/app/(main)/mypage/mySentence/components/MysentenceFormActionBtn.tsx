import DeleteMySentenceBtn from "./DeleteMySentenceBtn";
import ModifySentenceBtn from "./ModifySentenceBtn";

export default function MySentenceFormActionBtn() {
  return (
    <div className="flex flex-row gap-3">
      <ModifySentenceBtn />
      <DeleteMySentenceBtn />
    </div>
  );
}
