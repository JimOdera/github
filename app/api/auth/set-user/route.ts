// app/api/auth/set-user/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const user = await request.json();

    const response = NextResponse.json({ success: true });

    response.cookies.set("klimaUser", JSON.stringify(user), {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false, // Required so client can read it too
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
  }
}