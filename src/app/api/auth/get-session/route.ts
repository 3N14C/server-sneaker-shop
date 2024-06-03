import { secret } from "@/constants/jwt-secret";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");

  if (!token) throw new Error("Токен отсутствует");

  try {
    const verifiedJWt = await jwtVerify(token, secret);

    if (!verifiedJWt) throw new Error("Токен недействителен");

    const user = await prisma.user.findUnique({
      where: {
        id: verifiedJWt.payload.sub as string,
      },
    });

    if (!user) throw new Error("Пользователь не найден");

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof JWTExpired) {
      cookies().delete("admin-dashboard-token");

      return NextResponse.json({ error: "Токен истек" });
    }
  }

  return NextResponse.json({});
};
