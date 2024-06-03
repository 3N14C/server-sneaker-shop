import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { token } = await req.json();

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  cookies().delete("token");

  return NextResponse.json({ token: null });
};
