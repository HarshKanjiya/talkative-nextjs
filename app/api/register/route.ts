import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismaDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      return new NextResponse("Please, Fill all the Details!", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, user: user });
  } catch (error: any) {
    console.log("REGISTRATION ERROR", error.message);
    return new NextResponse("Internal Server Error!", { status: 500 });
  }
}
