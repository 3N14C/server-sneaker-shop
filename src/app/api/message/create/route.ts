import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: { chatId: string; userId: string; message: string } =
    await req.json();

  const message = await prisma.message.create({
    data: {
      chatId: data.chatId,
      userId: data.userId,
      message: data.message,
    },
  });

  return NextResponse.json(message);
};
