import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isAccessToken =
    request.cookies.has("X_ACCESS_TOKEN") ||
    request.cookies.has("X_REFRESH_TOKEN");
  console.log("proxy", isAccessToken, new URL(request.url).pathname);
  // TODO

  if (!isAccessToken) {
    if (new URL(request.url).pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return;
    }
  }

  if (new URL(request.url).pathname === "/") {
    return NextResponse.redirect(new URL("/select-cabinet", request.url));
  }
}

export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png|.*\\.ico$).*)"],
};
