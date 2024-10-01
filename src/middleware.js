import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const allowedOrigins = ["http://localhost:8080"];

const allowedNoToken = ["/api/login", "/api/user"];

async function verifyJwt(token) {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function middleware(req) {
  const origin = req.headers.get("origin");
  const { pathname } = req.nextUrl;
  const token = req.headers.get("authorization");
  const response = NextResponse.next();

  // console.log(
  //   `This log is from middleware, while get path: ${pathname} with token: ${token}`
  // );
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Handle OPTIONS preflight requests
  if (req.method === "OPTIONS") {
    // Create a new response for preflight requests
    const preflightResponse = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
          ? origin
          : "",
        "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      },
    });
    return preflightResponse;
  }

  // Add CORS headers for all other requests
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Origin",
    allowedOrigins.includes(origin) ? origin : ""
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (!allowedNoToken.includes(pathname)) {
    const decoded = await verifyJwt(token);
    if (!token || !decoded) {
      // console.log(
      //   `Unauthorized. Path: ${pathname}, Can't find access token or jwt not ok.`
      // );
      return new Response(
        JSON.stringify({
          error: `Unauthorized. Path: ${pathname}, Can't find access token or jwt not ok.`,
        }),
        {
          status: 401,
        }
      );
    } else {
      // console.log("Authorized complete.", decoded);
      response.headers.set("user", JSON.stringify(decoded));
    }
  }
  return response;
}

export const config = {
  matcher: ["/api/:path*"], // Apply to all API routes
};
