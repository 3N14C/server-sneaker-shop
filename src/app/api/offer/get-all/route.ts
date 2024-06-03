import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const offers = await prisma.offer.findMany({
    include: {
      sneakers: true,
    },
  });

  return NextResponse.json(offers);
};
