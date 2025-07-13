"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Nav from "./components/Nav";
import styles from "./styles/pages/HomePage.module.css";

export default function HomePage() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const loggedOut = searchParams.get("loggedOut");

    useEffect(() => {
        if (status === "unauthenticated" && !loggedOut) {
            signIn("keycloak");
        }
    }, [status, loggedOut]);

    if (status === "loading") return <p>Loading session...</p>;
    if (!session) return <p>Redirecting to login...</p>;

    return (
        <main className={styles.homePage}>
            <Nav />
            <h1 className={styles.title}>Welcome to the Home Page</h1>
            <p>Welcome back, {session.user.name}!</p>
        </main>
    );
}

