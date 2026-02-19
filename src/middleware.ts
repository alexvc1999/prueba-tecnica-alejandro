import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const isPanelPage = request.nextUrl.pathname.startsWith("/panel");
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (isPanelPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/panel", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/login"],
};
