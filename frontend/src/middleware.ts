import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
  role: string;
}

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "";

// fonction utilisé à chaque appel du middleware (qd on va sur une page)
export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("token");
  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(JWT_PRIVATE_KEY)
  );
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  let response: NextResponse<unknown>;
  // si token undefined
  if (!token) {
    // si l'user essaie d'aller sur ces deux liens
    if (request.nextUrl.pathname.startsWith("/admin/joueurs")) {
      // on renvoie à l'accueil
      response = NextResponse.redirect(new URL("/", request.url));
    } else {
      // sinon on ne change rien
      response = NextResponse.next();
    }
    // on supprime email et role si present dans les cookies
    response.cookies.delete("email");
    response.cookies.delete("role");
    return response;
  }

  try {
    const payload = await verify(token);

    // si on a une email
    if (payload.email) {
      response = NextResponse.next();

      // si on est sur le login en etant connecté
      if (request.nextUrl.pathname === "/admin") {
        // si c'est un admin
        if (payload.role === "ADMIN") {
          // on renvoie directement vers la page des players sans se reconnecter
          response = NextResponse.redirect(
            new URL("/admin/joueurs", request.url)
          );
        } else {
          // sinon on renvoie à l'accueil
          response = NextResponse.redirect(new URL("/", request.url));
        }
      }

      const allowedPaths = ["/admin/joueurs", "/admin/buts", "/admin/saisons"];
      if (request.nextUrl.pathname.startsWith("/admin/")) {
        if (!allowedPaths.includes(request.nextUrl.pathname)) {
          // redirection vers l'accueil si le chemin n'est pas autorisé
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      response.cookies.set("email", payload.email);
      response.cookies.set("role", payload.role);
      return response;
    }
    return NextResponse.redirect(new URL("/", request.url));
  } catch (err) {
    if (request.nextUrl.pathname.startsWith("/")) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  }
}
