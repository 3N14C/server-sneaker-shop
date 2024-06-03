import prisma from "@/lib/prisma";
import { Sneaker } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: Sneaker = await req.json();

  const sneaker = await prisma.sneaker.create({
    data: {
      ...data,
    },
  });

  return NextResponse.json(sneaker);
};
