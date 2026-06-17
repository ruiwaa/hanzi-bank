import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <form className="bg-white w-full  max-w-md h-150 flex  flex-col shadow-2xs p-8 gap-3">
      <h2 className="font-semibold">회원가입</h2>
      <span className="text-sm  text-gray-500">
        중단어 창고에 오신 것을 환영합니다.
      </span>
      {/* 닉네임,  비밀번호 규칙에 대해 설명을 해줘야함 */}
      <div className="space-y-2 w-full">
        <label htmlFor="nickName" className="sr-only">
          이름(닉네임)
        </label>
        <input
          type="text"
          id="nickName"
          placeholder="이름 또는 닉네임"
          aria-describedby="userName"
          className="w-full pl-12 text-gray-700 bg-gray-100  py-2  rounded-lg "
        />
        <span id="userName" className="sr-only">
          이름 또는 닉네임을 입력하세요.
        </span>
      </div>
      <div className="space-y-2 w-full">
        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          aria-describedby="userPassword"
          className="w-full pl-12 text-gray-700 bg-gray-100  py-2  rounded-lg "
        />
        <span id="userPassword" className="sr-only">
          비밀번호를 입력하세요.
        </span>
      </div>
      <div className="w-full space-y-2">
        <label htmlFor="passwordCheck" className="sr-only">
          비밀번호 확인
        </label>
        <input
          type="password"
          id="passwordCheck"
          placeholder="설정한 비밀번호를 한번 더 입력해주세요"
          aria-describedby="userPasswordCheck"
          className="w-full pl-12 text-gray-700 bg-gray-100  py-2  rounded-lg "
        />
        <span id="userPasswordCheck" className="sr-only">
          설정한 비밀번호를 한번 더 입력해주세요.
        </span>
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="HSK 급수  선택" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="level-1">Hsk 1급</SelectItem>
          <SelectItem value="level-2">Hsk 2급</SelectItem>
          <SelectItem value="level-3">Hsk 3급</SelectItem>
          <SelectItem value="level-4">Hsk 4급</SelectItem>
          <SelectItem value="level-5">Hsk 5급</SelectItem>
          <SelectItem value="level-6">Hsk 6급</SelectItem>
        </SelectContent>
      </Select>
      <button
        type="submit"
        className="w-full  bg-primary  text-white  p-1 hover:bg-accent hover:text-gray-400 font-semibold  rounded-lg"
      >
        가입 완료하기
      </button>
      <span className="text-sm  text-gray-500 self-center">
        이미 계정이 있으신가요?{" "}
        <Link href={"/login"} className="text-primary">
          로그인하러가기
        </Link>
      </span>
    </form>
  );
}
