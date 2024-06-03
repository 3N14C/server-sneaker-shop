import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const orders = await prisma.order.findMany({
    include: {
      orderRoute: true,
      sneakers: true,
      user: true,
    },
  });

  return NextResponse.json(orders);
};
