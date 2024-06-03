import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
