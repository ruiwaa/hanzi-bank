import { resetUserPassword } from "@/app/api/resetUserPassword";
import { useState } from "react";

interface Props {
  email?: string;
}

export default function ResetPasswordSection({ email }: Props) {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return;

    await resetUserPassword(email);
    setIsEmailSent(true);
  };

  return (
    <>
      {isEmailSent ? (
        <div>
          <p>비밀번호 재설정 이메일을 보냈습니다.</p>
          <p>이메일을 확인하여 비밀번호를 재설정해주세요.</p>
        </div>
      ) : (
        <div className="flex justify-between">
          <p>
            비밀번호를 잊어버린 경우 이메일을 통해 새로운 비밀번호를 설정할 수
            있습니다.
          </p>
          <button
            type="button"
            className="bg-orange-400 rounded-lg py-1 px-2 font-semibold w-fit"
            onClick={handleResetPassword}
          >
            재설정 이메일 보내기
          </button>
        </div>
      )}
    </>
  );
}
