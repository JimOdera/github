// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('klimaUser')?.value;
  let user = null;

  if (cookie) {
    try {
      user = JSON.parse(cookie);
    } catch (e) {
      user = null;
    }
  }

  const { pathname } = request.nextUrl;

  // 1. Root redirect
  if (pathname === '/' || pathname === '/index') {
    if (user) {
      // If logged in → go to the right place based on onboarding status
      if (user.hasCompletedOnboarding) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/platform', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/sign-up', request.url));
    }
  }

  // 2. All routes that require authentication + onboarding
  const protectedRoutes = [
    '/dashboard',
    '/projects',
    '/activities',
    '/experts',
    '/co-ordinates',
    '/reports',
    '/profile',
    '/settings',
  ];

  const requiresOnboardingComplete = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Not logged in → force sign-up
  if (requiresOnboardingComplete && !user) {
    const url = new URL('/sign-up', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Logged in BUT onboarding not complete → ONLY allow /platform (and its subpaths)
  if (user && !user.hasCompletedOnboarding) {
    const isOnPlatform = pathname.startsWith('/platform');

    if (!isOnPlatform && requiresOnboardingComplete) {
      // Block everything except /platform and its children
      return NextResponse.redirect(new URL('/platform', request.url));
    }
  }

  // Everything else is allowed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/platform/:path*',        // ← important: include platform in matcher
    '/projects/:path*',
    '/activities/:path*',
    '/experts/:path*',
    '/co-ordinates/:path*',
    '/reports/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};