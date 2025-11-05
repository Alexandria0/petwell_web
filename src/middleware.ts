import {NextResponse, NextRequest} from "next/server";

const protectedRoutes = ["/create-service", "/choose-profile", "/my-services"];
const authRoutes = ["/sign-in", "/sign-up"];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const {pathname} = request.nextUrl;

  if (isAuthRoute(pathname) && token && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute(pathname) && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-service",
    "/choose-profile",
    "/my-services",
    "/sign-in",
    "/sign-up",
  ],
};
