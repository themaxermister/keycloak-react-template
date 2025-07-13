import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
const KEYCLOAK_ISSUER = `${process.env.NEXT_PUBLIC_KEYCLOAK_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`;
const KEYCLOAK_CLIENT_ID = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

export const authOptions = {
    debug: true,
    providers: [
        KeycloakProvider({
            clientId: KEYCLOAK_CLIENT_ID,
            clientSecret: KEYCLOAK_CLIENT_SECRET,
            issuer: KEYCLOAK_ISSUER,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.idToken = account.id_token;  // save id_token here
                token.name = profile.name;
                token.email = profile.email;
                token.section = profile.section;
                token.username = profile.preferred_username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.section = token.section;
            session.user.username = token.username;
            session.user.idToken = token.idToken;  // expose it in session
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url;
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };