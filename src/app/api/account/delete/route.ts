import { deleteAccount } from "@/app/api/deleteAccount";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const result = await deleteAccount();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "회원 탈퇴에 실패했습니다.",
      },
      { status: 500 },
    );
  }
}
