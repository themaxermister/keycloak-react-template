import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const KEYCLOAK_URL = process.env.NEXT_PUBLIC_KEYCLOAK_SERVER_URL;
const KEYCLOAK_REALM = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
const LOGOUT_REDIRECT_URI = process.env.NEXT_PUBLIC_LOGOUT_REDIRECT_URI;

export async function GET(request) {
    if (!KEYCLOAK_URL || !KEYCLOAK_REALM || !LOGOUT_REDIRECT_URI) {
        return new NextResponse("Missing Keycloak config", { status: 500 });
    }

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const idTokenHint = token?.id_token;
    if (!idTokenHint) {
        return new Response("Missing ID token", { status: 400 });
    }

    // Construct logout URL with id_token_hint
    const keycloakLogoutURL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`

    const response = NextResponse.redirect(keycloakLogoutURL);

    // Clear cookies
    response.cookies.set("next-auth.session-token", "", {
        maxAge: 0,
        path: "/",
    });
    response.cookies.set("__Secure-next-auth.session-token", "", {
        maxAge: 0,
        path: "/",
        secure: true,
    });

    return response;
}
