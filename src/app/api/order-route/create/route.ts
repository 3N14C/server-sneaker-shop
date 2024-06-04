import prisma from "@/lib/prisma";
import { OrderRoute } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: OrderRoute = await req.json();

  const orderRoute = await prisma.orderRoute.create({
    data: {
      address: data.address,
      name: data.name,
      orderId: data.orderId,
    },
  });

  if (!orderRoute) throw new Error("Failed to create order route");

  return NextResponse.json(orderRoute);
};
