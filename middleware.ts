// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("klimaUser")?.value;
  let user = null;

  if (cookie) {
    try {
      user = JSON.parse(cookie);
    } catch (e) {
      // invalid cookie
    }
  }

  const pathname = request.nextUrl.pathname;

  if (pathname === "/" || pathname === "/index") {
    return user
      ? NextResponse.redirect(new URL("/platform", request.url))
      : NextResponse.redirect(new URL("/sign-up", request.url));
  }

  const protectedRoutes = [
    "/dashboard",
    "/platform",
    "/projects",
    "/activities",
    "/coordinates",
    "/experts",
    "/reports",
    "/profile",
    "/settings",
  ];

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !user) {
    const url = new URL("/sign-up", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/platform/:path*",
    "/projects/:path*",
    "/(activities|coordinates|experts|reports|profile|settings)/:path*",
  ],
};