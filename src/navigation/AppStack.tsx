import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Splash from "../screens/Splash/Splash";
import {navigationConstants} from "../constants/NavigationConstant";
import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
import History from "../screens/History/History";

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">

      <Stack.Screen name={navigationConstants.SPLASH} component={Splash} />
      <Stack.Screen name={navigationConstants.LOGIN} component={Login} />
      <Stack.Screen name={navigationConstants.HOME} component={Home} />
      <Stack.Screen name={navigationConstants.HISTORY} component={History} />
    </Stack.Navigator>
  );
};
