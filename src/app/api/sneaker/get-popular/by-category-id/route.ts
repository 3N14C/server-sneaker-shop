import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("id");

  if (categoryId === "Все") {
    const sneakers = await prisma.sneaker.findMany({
      where: {
        sneakerStatus: "STOCK",
        soldCount: {
          gt: 2,
        }
      },
    });
    return NextResponse.json(sneakers);
  }

  const sneakers = await prisma.sneaker.findMany({
    where: {
      categoryId: categoryId as string,
      sneakerStatus: "STOCK",
      soldCount: {
        gt: 2,
      }
    },
  });

  return NextResponse.json(sneakers);
};
