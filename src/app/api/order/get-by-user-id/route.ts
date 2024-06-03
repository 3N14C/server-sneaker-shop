import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");

  const orders = await prisma.order.findMany({
    where: {
      userId: userId as string,
    },

    include: {
      sneakers: true,
    },
  });

  return NextResponse.json(orders);
};
