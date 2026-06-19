
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

/**
 * See "Matching Paths" below to learn more about matching paths
 * and how to specify them.
 *
 * The `matcher` property is required, and must be a string or an array of strings.
 *  */ 
export const config = {
  matcher: '/aboutt/:path*',
}