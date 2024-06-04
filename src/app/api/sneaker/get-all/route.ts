import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const take = searchParams.get("take");

  const sneakers = await prisma.sneaker.findMany({
    include: {
      category: true,
      offer: true,
      orders: true,
      sizes: true,
    },

    take: take ? +take : undefined,
  });

  return NextResponse.json(sneakers);
};
