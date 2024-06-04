import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const orderId = searchParams.get("id");

  const order = await prisma.order.delete({
    where: {
      id: orderId as string,
    },
  });

  return NextResponse.json({ order, message: "Order deleted successfully" });
};
