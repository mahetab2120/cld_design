/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { StyleSheet } from "react-native";
import { navigationRef } from "./src/navigation/Navigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/navigation/AppStack";
import { Provider } from "react-redux";
import store from "./src/stores/Redux/Store";

function App(): JSX.Element {
return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider>
        <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}>
          <AppStack />
        </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  )
}

export default App;
