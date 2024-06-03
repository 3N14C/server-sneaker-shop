import { alg } from "@/constants/jwt-alg";
import { secret } from "@/constants/jwt-secret";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { SignJWT } from "jose";
import { NodeNextResponse } from "next/dist/server/base-http/node";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NodeNextResponse) => {
  const data: User = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
      password: data.password,
    },
  });

  if (!user) throw new Error("Invalid credentials");
  if (user.role === "USER") throw new Error("You are not an admin");

  const jwt = await new SignJWT({ role: user.role })
    .setProtectedHeader({ alg: alg })
    .setExpirationTime("30d")
    .setSubject(user.id.toString())
    .sign(secret);

  cookies().set("admin-dashboard-token", jwt, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  return NextResponse.json({ token: jwt });
};
