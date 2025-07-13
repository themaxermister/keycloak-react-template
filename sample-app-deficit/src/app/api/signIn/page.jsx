"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn("keycloak"); // Skip /api/auth/signin page
    }
    else if (status === "authenticated") {
      void router.replace("/"); // Already signed in, redirect to home
    }
  }, [status, router]);

  return <p>Redirecting to login...</p>;
}
