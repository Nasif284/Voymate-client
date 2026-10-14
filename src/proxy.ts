import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const userRefreshToken = request.cookies.get("refreshToken")?.value;
  const adminRefreshToken = request.cookies.get("adminRefreshToken")?.value;

  const isUserAuth = pathname === "/login" || pathname === "/signup";
  const isAdminAuth = pathname === "/admin/login";

  const isAdminRoute = pathname.startsWith("/admin");
  const isUserProtected =
    pathname.startsWith("/home") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/trips") ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/messages") ||
    pathname.startsWith("/matches") ||
    pathname.startsWith("/connections") ||
    pathname.startsWith("/ai-assistant");

  if (pathname == "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  if (isUserAuth && userRefreshToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (pathname === "/" && userRefreshToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (isAdminAuth && adminRefreshToken) {
    return NextResponse.redirect(new URL("/admin/users", request.url));
  }

  if (isUserProtected && !userRefreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && !isAdminAuth && !adminRefreshToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
