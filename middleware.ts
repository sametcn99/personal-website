import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/admin",
};

export function middleware(req: NextRequest) {
  // Parse the cookie
  const isAdmin = JSON.parse(req.cookies.get("admin")?.value || "false");

  // Update url pathname
  req.nextUrl.pathname = `/${isAdmin ? "admin" : "not-admin"}`;
  console.log(req.nextUrl.pathname);
  console.log(req.nextUrl);
  console.log(isAdmin);
  // Rewrite to url
  return NextResponse.rewrite(req.nextUrl);
}
