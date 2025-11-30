// middleware.ts  (project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('klimaUser')?.value;
  const pathname = request.nextUrl.pathname;

  // 1. Root path handling
  if (pathname === '/' || pathname === '/index') {
    if (user) {
      // Already logged in → go straight to /platform
      return NextResponse.redirect(new URL('/platform', request.url));
    } else {
      // Not logged in → go to sign-up
      return NextResponse.redirect(new URL('/sign-up', request.url));
    }
  }

  // 2. Protected routes (all your app pages)
  const protectedBases = [
    '/dashboard',
    '/projects',
    '/activities',
    '/coordinates',
    '/platform',
    '/experts',
    '/reports',
    '/components',
    '/profile',
    '/settings',
  ];

  const isProtected = protectedBases.some(base =>
    pathname.startsWith(base)
  );

  if (isProtected && !user) {
    const url = new URL('/sign-up', request.url);
    url.searchParams.set('redirect', pathname); // optional: remember where they were
    return NextResponse.redirect(url);
  }

  // Everything else → allow (assets, /sign-up, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/projects/:path*',
    '/activities/:path*',
    '/coordinates/:path*',
    '/platform/:path*',
    '/experts/:path*',
    '/reports/:path*',
    '/components/:path*',
    '/profile',
    '/settings',
  ],
};