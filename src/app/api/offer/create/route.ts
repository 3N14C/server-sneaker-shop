import prisma from "@/lib/prisma";
import { Offer } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: Offer = await req.json();

  const offer = await prisma.offer.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    offer,
    message: "Offer created successfully",
  });
};
