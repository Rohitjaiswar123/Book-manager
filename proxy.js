import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

// Add paths that require authentication here
const protectedPaths = ['/dashboard'];

// Add paths that authenticated users shouldn't access (like login/signup)
const authPaths = ['/login', '/signup'];

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    const isAuthPath = authPaths.some(path => pathname.startsWith(path));

    const token = request.cookies.get('token')?.value;

    // Verify token lazily if needed
    let isValidToken = false;
    if (token) {
        const payload = await verifyToken(token);
        isValidToken = !!payload;
    }

    // If trying to access protected path without valid token, redirect to login
    if (isProtectedPath && !isValidToken) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', encodeURI(pathname));
        return NextResponse.redirect(url);
    }

    // If trying to access auth path with valid token, redirect to dashboard
    if (isAuthPath && isValidToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
};
