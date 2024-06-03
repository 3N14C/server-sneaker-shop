import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const orderRoutes = await prisma.orderRoute.findMany();

  return NextResponse.json(orderRoutes);
};
