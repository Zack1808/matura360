import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import Login from "./src/pages/Login";
import StartScreen from "./src/pages/StartScreen";
import Register from "./src/pages/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loadedFont, fontError] = useFonts({
    nohemi: require("./assets/fonts/Nohemi-Regular.ttf"),
    nohemiMedium: require("./assets/fonts/Nohemi-Medium.ttf"),
    nohemiSemiBold: require("./assets/fonts/Nohemi-SemiBold.ttf"),
    nohemiBold: require("./assets/fonts/Nohemi-Bold.ttf"),
  });

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="StartScreen"
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
