import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

import {
  AUTH_ROUTE_PREFIX,
  DEFAULT_LOGIN_REDIRECT_URL,
  LOGIN_ROUTE,
  PROTECTED_ROUTES,
} from './constants/auth'

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  const isAuthRoute = request.nextUrl.pathname.startsWith(AUTH_ROUTE_PREFIX)
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  )

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(
      new URL(DEFAULT_LOGIN_REDIRECT_URL, request.url),
    )
  }

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
