import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const sneakers = await prisma.sneaker.findMany({
    where: {
      soldCount: {
        gt: 2,
      },
    },
  });

  return NextResponse.json(sneakers);
};
