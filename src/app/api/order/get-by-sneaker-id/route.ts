import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const orderId = searchParams.get("id");
  const sneakerId = searchParams.get("sneakerId");

  const order = await prisma.order.findUnique({
    where: {
      id: orderId as string,
    },
    include: {
      sneakers: {
        where: {
          id: sneakerId as string,
        },
      },
      orderRoute: true
    },
  });

  return NextResponse.json(order);
};
