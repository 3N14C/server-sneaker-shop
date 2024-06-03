import prisma from "@/lib/prisma";
import { formAddUser } from "@/validators/form-create-user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const data: z.infer<typeof formAddUser> = await req.json();

  const user = await prisma.user.create({
    data: {
      ...data,
    },
  });

  if (!user) throw new Error("Failed to create user.");

  await prisma.chat.create({
    data: {
      user: {
        connect: ["clwxh9xbz0002uwy1i7ivt9kc", user.id].map((id) => ({
          id,
        })),
      },

      message: {
        create: {
          userId: "clwxh9xbz0002uwy1i7ivt9kc",
          message:
            "Добро пожаловать! Если у вас есть вопросы обратитесь к нам в чат",
        },
      },
    },
  });

  return NextResponse.json(user);
};
