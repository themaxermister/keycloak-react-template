"use client";

import React, { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  // While redirecting to login, render nothing or loading
  if (!keycloak.authenticated) {
    return <div>Redirecting to login...</div>;
  }

  // Authenticated, render children
  return children;
};

export default PrivateRoute;
