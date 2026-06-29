import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<{
    keyWord: string;
  }>;
  errors: FieldErrors<{
    keyWord: string;
  }>;
}

export default function SearchForm({ register, errors }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-muted-foreground">텍스트 검색</h3>
      <label htmlFor="textSearch" className="sr-only">
        텍스트 검색
      </label>
      <input
        id="textSearch"
        placeholder="찾으시는 단어를 검색해주세요."
        aria-describedby="textSearchHelp"
        className="bg-input p-2 rounded-xl"
        {...register("keyWord")}
      />
      {errors.keyWord && (
        <p className="text-red-500">{errors.keyWord.message}</p>
      )}
      <span id="textSearchHelp" className="sr-only">
        찾으시는 단어를 입력해주세요.
      </span>
    </div>
  );
}
