import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const chatId = searchParams.get("id");

  const messages = await prisma.message.findMany({
    where: {
      chatId: chatId as string,
    },

    include: {
      user: true
    }
  });

  return NextResponse.json(messages);
};
