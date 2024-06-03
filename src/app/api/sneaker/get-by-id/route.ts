import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const sneakerId = searchParams.get("id");

  const sneaker = await prisma.sneaker.findUnique({
    where: {
      id: sneakerId as string,
    },

    include: {
      sizes: true,
    },
  });

  return NextResponse.json(sneaker);
};
