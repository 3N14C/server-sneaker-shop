import prisma from "@/lib/prisma";
import { Sneaker } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const sneakerId = searchParams.get("id");
  
  const data: Sneaker = await req.json();
  const sneaker = await prisma.sneaker.update({
    where: {
      id: sneakerId as string,
    },
    data,
  });
  return NextResponse.json(sneaker);
};
