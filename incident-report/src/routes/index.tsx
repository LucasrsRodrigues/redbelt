import React, { useEffect } from "react";
import { useAuth } from "@hooks/auth"
import { NavigationContainer } from "@react-navigation/native";
import { UnsafeRoutes } from "./unsafe.routes";
import { SafeRoutes } from "./safe.route";

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user?.access_token ? <SafeRoutes /> : <UnsafeRoutes />}
    </NavigationContainer>
  )
}