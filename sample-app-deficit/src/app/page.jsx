"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session, status } = useSession({ required: true });

  const handleLogout = async () => {
    window.location.href = "/api/logout";
  };

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <main>
    <p>Welcome, {session?.user?.name}</p>
    <p>Email: {session?.user?.email}</p>
    <p>Section: {session?.user?.section}</p>
    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
      Logout
    </button>
  </main>
  );
}
