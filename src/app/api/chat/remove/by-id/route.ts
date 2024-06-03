import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const chatId = searchParams.get("id");

  const chat = await prisma.chat.delete({
    where: {
      id: chatId as string,
    },
  });

  return NextResponse.json(chat);
};
