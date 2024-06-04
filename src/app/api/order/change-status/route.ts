import prisma from "@/lib/prisma";
import { $Enums, Order } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest) => {
  const data: Order = await req.json();
  const { searchParams } = req.nextUrl;
  const orderId = searchParams.get("id");

  const order = await prisma.order.update({
    where: {
      id: orderId as string,
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json({ order, message: "Order updated successfully" });
};
