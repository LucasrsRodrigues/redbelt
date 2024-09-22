import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dashboard } from "@screens/Dashboard";
import { RegisterIncident } from "@screens/RegisterIncident";
import { ShowIncident } from "@screens/ShowIncident";

const { Navigator, Screen } = createNativeStackNavigator();

export function SafeRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="RegisterIncident" component={RegisterIncident} />
      <Screen name="ShowIncident" component={ShowIncident} />
    </Navigator>
  )
}