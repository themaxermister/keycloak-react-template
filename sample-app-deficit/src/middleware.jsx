import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/signIn", // Our custom sign-in logic page (see next file)
  },
});

// Match routes that require auth
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};