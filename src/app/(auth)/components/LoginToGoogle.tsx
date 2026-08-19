import Image from "next/image";

interface Props {
  onCLick: () => void;
}

export default function LogintoGoogle({ onCLick }: Props) {
  return (
    <button
      type="button"
      onClick={onCLick}
      className="w-full p-0.5 rounded-lg flex flex-row gap-2 items-center justify-center border border-primary hover:bg-accent dark:border-blue-600 dark:text-blue-600"
    >
      <Image
        src={"/images/lightGoogle.svg"}
        alt={"구글 로고"}
        width={30}
        height={30}
        className="block dark:hidden"
      />
      <Image
        src={"/images/darkGoogle.svg"}
        alt={"구글 로고"}
        width={30}
        height={30}
        className="hidden dark:block"
      />
      <span className="font-medium">Google로 로그인</span>
    </button>
  );
}
