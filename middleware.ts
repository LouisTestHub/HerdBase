import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedPaths = ['/admin', '/dashboard', '/settings'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a protected route
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));
  
  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for auth cookie (demo mode: accept any herdbase_session cookie)
  const session = request.cookies.get('herdbase_session');
  
  // In demo mode, also check for a demo query param to set the cookie
  const demoParam = request.nextUrl.searchParams.get('demo');
  
  if (demoParam) {
    // Set demo session cookie and continue
    const response = NextResponse.next();
    response.cookies.set('herdbase_session', `demo_${demoParam}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  if (!session) {
    // Redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/settings/:path*'],
};
