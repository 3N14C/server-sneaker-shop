import prisma from "@/lib/prisma";
import { Size } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: Size = await req.json();
  const size = await prisma.size.create({
    data: {
      ...data,
    },
  });
  return NextResponse.json(size);
};
