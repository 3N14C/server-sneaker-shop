import prisma from "@/lib/prisma";
import { Order } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: Order & { sneakerId: string[] } = await req.json();

  data.sneakerId.forEach(async (sneakerId) => {
    if (!sneakerId) {
      throw new Error("sneakerId is required");
    }

    if (typeof sneakerId !== "string") {
      throw new Error("sneakerId must be a string");
    }

    if (!sneakerId.trim()) {
      throw new Error("sneakerId cannot be empty");
    }

    const orders = await prisma.order.create({
      data: {
        city: data.city,
        street: data.street,
        orderSum: data.orderSum,
        userId: data.userId,
        sneakers: {
          connect: [{ id: sneakerId }],
        },
        orderRoute: {
          create: {
            name: "Ваш заказ упаковывается",
            address: "г. Иркутск, ул. Ленина, д. 1",
          },
        },
      },
    });

    if (!orders) throw new Error("Failed to create order");

    await prisma.sneaker.update({
      where: {
        id: sneakerId,
      },
      data: {
        soldCount: {
          increment: data.sneakerId.length,
        },
      },
    });

    return NextResponse.json(orders);
  });

  return NextResponse.json({
    message: "Order created successfully",
  });
};
