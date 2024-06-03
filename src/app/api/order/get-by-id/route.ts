import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const orderId = searchParams.get("id");

  const order = await prisma.order.findUnique({
    where: {
      id: orderId as string,
    },
    include: {
      sneakers: true,
      orderRoute: true
    },
  });

  return NextResponse.json(order);
};
