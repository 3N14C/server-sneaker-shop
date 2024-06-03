import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const offerId = searchParams.get("id");

  const offer = await prisma.offer.findUnique({
    where: {
      id: offerId as string,
    },

    include: {
      sneakers: true,
    },
  });

  return NextResponse.json(offer);
};
