import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });

  return NextResponse.json(users);
};
