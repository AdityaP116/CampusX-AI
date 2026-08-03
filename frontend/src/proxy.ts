import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const protectedRoutes = ["/create", "/messages", "/profile"]
// Routes only for unauthenticated users
const authRoutes = ["/login", "/register"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuthed = request.cookies.has("campusx-authed")

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !isAuthed) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (authRoutes.includes(pathname) && isAuthed) {
    return NextResponse.redirect(new URL("/marketplace", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/create", "/messages", "/profile", "/login", "/register"],
}
