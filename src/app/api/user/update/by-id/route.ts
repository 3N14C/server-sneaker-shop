import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  const data: User = await req.json();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  const user = await prisma.user.update({
    where: {
      id: userId as string,
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json(user);
};
