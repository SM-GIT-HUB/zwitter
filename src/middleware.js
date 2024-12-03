import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

async function isVerified(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const encoder = new TextEncoder();
    const key = encoder.encode(secret);

    const res = await jwtVerify(token, key);
    return res;
  } catch (err) {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('jwt')?.value;
  
  const publicUrls = ['/login', '/signup'];
  const verified = await isVerified(token);

  if (publicUrls.some((url) => pathname.startsWith(url))) {
    if (token && isVerified(token)) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  }

  if (!token || !verified)
  {
    const response =  NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('jwt');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home',
    '/profile/:any',
    '/login',
    '/signup'
  ]
}