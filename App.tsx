import { Provider } from "react-redux";

import { store } from "./src/redux/store";

import StartScreen from "./src/pages/StartScreen";

export default function App() {
  return (
    <Provider store={store}>
      <StartScreen />
    </Provider>
  );
}
