import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import store from "../store";
import { InitProvider } from "./InitProvider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <InitProvider>{children}</InitProvider>
    </Provider>
  );
}
