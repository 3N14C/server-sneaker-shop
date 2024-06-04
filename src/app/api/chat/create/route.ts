import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: { userId: string } = await req.json();

  const existingChat = await prisma.chat.findMany({
    where: {
      user: {
        every: {
          id: {
            in: ["clwxh9xbz0002uwy1i7ivt9kc", data.userId],
          },
        },
      },
    },
  });

  if (existingChat) throw new Error("Chat already exists");

  const chat = await prisma.chat.create({
    data: {
      user: {
        connect: ["clwxh9xbz0002uwy1i7ivt9kc", data.userId].map((id) => ({
          id,
        })),
      },
    },
  });

  return NextResponse.json(chat);
};
