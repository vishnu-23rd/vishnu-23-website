import { routing } from "@/i18n/routing";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

const intlMiddleware = createIntlMiddleware(routing);

// Add this helper function to remove locale prefixes
function removeLocaleFromPath(pathname: string): string {
  // Check if the path starts with a locale
  for (const locale of routing.locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      // Remove the locale prefix and return the rest of the path
      return pathname.substring(locale.length + 1);
    } else if (pathname === `/${locale}`) {
      // If the path is just the locale, return root path
      return "/";
    }
  }
  // No locale prefix found, return as is
  return pathname;
}

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies.get("authToken")?.value;
  const token = authHeader?.split(" ")[1] || cookieToken;

  // public page routes (now with locale)
  const publicRoutes = {
    exact: ["/", "/en", "/th"],
    startsWith: ["/explore", "/en/explore", "/th/explore"],
  };

  const isPublicRoute =
    publicRoutes.exact.includes(req.nextUrl.pathname) ||
    publicRoutes.startsWith.some((prefix) =>
      req.nextUrl.pathname.startsWith(prefix)
    );

  // public api routes
  const publicApiRoutes = ["/api/v1/auth/login", "/api/v1/auth/logout"];
  const isPublicApiRoute = publicApiRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // next.js stuffs
  const isStaticFile =
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes(".");

  // redirect to login if no token
  if (!token && !isPublicRoute && !isPublicApiRoute && !isStaticFile) {
    // Remove locale from pathname for the redirect parameter
    const pathWithoutLocale = removeLocaleFromPath(req.nextUrl.pathname);

    return NextResponse.redirect(
      new URL(`/?redirect=${encodeURIComponent(pathWithoutLocale)}`, req.url)
    );
  }

  // Only then handle intl redirects
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // add the token to the authorization header if it exists for api routes
  if (token && req.nextUrl.pathname.startsWith("/api/") && !isPublicApiRoute) {
    const requestHeaders = new Headers(req.headers);
    if (!authHeader) {
      requestHeaders.set("authorization", `Bearer ${token}`);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}
