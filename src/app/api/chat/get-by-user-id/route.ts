import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const chat = await prisma.chat.findMany({
    where: {
      user: {
        some: {
          id: userId as string,
        },
      },
    },

    include: {
      message: true
    }
  });

  return NextResponse.json(chat);
};
