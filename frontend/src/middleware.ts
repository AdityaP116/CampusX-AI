import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that strictly require authenticated student session
const protectedRoutes = ["/create", "/messages", "/profile"]
// Routes only accessible to unauthenticated guests
const authRoutes = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for the presence of session token or auth indicator cookie
  // Note: Backend REST API enforces cryptographically signed Firebase ID token verification for all sensitive mutations
  const sessionCookie = request.cookies.get("campusx-token")?.value || request.cookies.get("campusx-authed")?.value
  const isAuthed = Boolean(sessionCookie && sessionCookie.trim().length > 0)

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !isAuthed) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (authRoutes.includes(pathname) && isAuthed) {
    const redirectTarget = request.nextUrl.searchParams.get("redirect") || request.nextUrl.searchParams.get("from") || "/"
    return NextResponse.redirect(new URL(redirectTarget, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/create/:path*", "/messages/:path*", "/profile/:path*", "/login", "/register"],
}
