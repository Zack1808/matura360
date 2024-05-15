import { Provider } from "react-redux";
import { useFonts } from "expo-font";

import { store } from "./src/redux/store";

import StartScreen from "./src/pages/StartScreen";

export default function App() {
  const [loadedFont, fontError] = useFonts({
    nohemi: require("./assets/fonts/Nohemi-Regular.ttf"),
    nohemiMedium: require("./assets/fonts/Nohemi-Medium.ttf"),
    nohemiSemiBold: require("./assets/fonts/Nohemi-SemiBold.ttf"),
    nohemiBold: require("./assets/fonts/Nohemi-Bold.ttf"),
  });

  return (
    <Provider store={store}>
      <StartScreen />
    </Provider>
  );
}
