"use client";

import Link from "next/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import styles from "@/app/styles/components/Nav.module.css";

export default function Nav() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>Home</Link> |{" "}
      <Link href="/secured" className={styles.link}>Secured</Link>
      {!session ? (
        <button onClick={() => signIn('keycloak')} className={styles.button}>
          Login
        </button>
      ) : (
        <>
          <div className={styles.userInfo}>
            <p><strong>Name:</strong> {session.user.name}</p>
            <p><strong>Username:</strong> {session.user.username || session.user.preferred_username}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>Section:</strong> {session.user.section}</p>
          </div>
          <button onClick={logout} className={styles.button}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

const logout = async () => {
  // Get id_token_hint from session
  const session = await getSession();
  const idToken = session?.user?.idToken;

  // End next-auth session without redirect
  await signOut({ redirect: false });

  // Build Keycloak logout URL with id_token_hint and post_logout_redirect_uri
  const keycloakBaseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_SERVER_URL;
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
  const redirectUri = encodeURIComponent(window.location.origin + "/");

  if (!idToken) {
    // fallback: just redirect to homepage or login page
    window.location.href = redirectUri;
    return;
  }

  const logoutUrl = `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/logout?post_logout_redirect_uri=${redirectUri}&id_token_hint=${idToken}`;
  window.location.href = logoutUrl;
};
