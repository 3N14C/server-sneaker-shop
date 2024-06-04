import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;
    const routeId = searchParams.get("id");

    const orderRoute = await prisma.orderRoute.delete({
        where: {
            id: routeId as string
        }
    });

    return NextResponse.json(orderRoute);
}