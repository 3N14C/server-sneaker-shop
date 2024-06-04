import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("id");

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId as string,
    },

    include: {
      sneakers: true,
    },
  });

  return NextResponse.json(category);
};
