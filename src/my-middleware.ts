import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET as string || 'YOUR_FALLBACK_SECRET');

const PUBLIC_PATHS = ['/login', '/signup', '/about', '/', '/forgot-password'];

const ACCESS_RULES: Record<string, string[]> = {
    user: ['/account', '/profile', '/complitprofil'],
    admin: ['/dashboard', '/profile', '/complitprofil'], 
    lender: ['/lender', '/profile', '/complitprofil'],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get('accessToken')?.value;
    let userRole: string | undefined;

    if (authToken) {
        try {
            const { payload } = await jose.jwtVerify(authToken, JWT_SECRET);
            userRole = payload.role as string;
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL('/login', request.url));
            
        }
    }

    if (!userRole) {
        if (!PUBLIC_PATHS.includes(pathname)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next(); 
    }

    const allowedPaths = ACCESS_RULES[userRole as keyof typeof ACCESS_RULES];
    const defaultRedirectPath = allowedPaths ? allowedPaths[0] : '/';

    if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
        return NextResponse.redirect(new URL(defaultRedirectPath, request.url));
    }

    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }
    
    if (!allowedPaths || allowedPaths.length === 0) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    const isPathAllowed = allowedPaths.some(allowedPath => {
        if (pathname === allowedPath) {
            return true;
        }
        if (pathname.startsWith(allowedPath + '/')) { 
            return true;
        }
        return false;
    });

    if (!isPathAllowed) {
        return NextResponse.redirect(new URL(defaultRedirectPath, request.url));
    }
    return NextResponse.next();
}


export const config = {
    matcher: ['/', '/login', '/signup', '/forgot-password', '/about', '/dashboard/:path*', '/account', '/profile/:path*', '/lender/:path*'],
};