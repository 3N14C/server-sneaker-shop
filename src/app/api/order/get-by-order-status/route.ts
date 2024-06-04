import prisma from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status") as $Enums.OrderStatus;
  const userId = searchParams.get("userId");

  if (status === "ORDERED") {
    const order = await prisma.order.findMany({
      where: {
        orderStatus: "ORDERED",
        userId: userId as string,
      },

      include: {
        orderRoute: true,
        sneakers: true,
      },
    });
    return NextResponse.json(order);
  }

  const order = await prisma.order.findMany({
    where: {
      orderStatus: {
        not: "ORDERED",
      },
      userId: userId as string,
    },

    include: {
      orderRoute: true,
      sneakers: true,
    },
  });

  return NextResponse.json(order);
};
