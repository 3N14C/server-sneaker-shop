import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const sizes = await prisma.size.findMany({
    include: {
      sneakers: true,
    },
  });

  return NextResponse.json(sizes);
};
