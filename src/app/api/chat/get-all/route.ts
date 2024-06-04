import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
    const chats = await prisma.chat.findMany({
        include: {
            message: {
                include: {
                    user: true
                }
            },
            user: true
        }
    })

    return NextResponse.json(chats)
}