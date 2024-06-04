import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userEmail = searchParams.get("email");
  const password = searchParams.get("password");

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail as string,
      password: password as string,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
};
