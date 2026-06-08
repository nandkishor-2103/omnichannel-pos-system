import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useState } from "react";

import App from "./App";
import "./index.css";

import { store, persistor } from "./app/store";
import BackendWakeupScreen from "./components/shared/BackendWakeupScreen";

export function RootApp() {
  const [isBackendReady, setIsBackendReady] = useState(!import.meta.env.PROD);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!import.meta.env.PROD) {
      return;
    }

    const wakeUpBackend = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

        const backendUrl = apiBaseUrl.replace("/api", "");

        await fetch(`${backendUrl}/health`, {
          credentials: "include",
        });

        setIsConnected(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsBackendReady(true);
      } catch {
        setTimeout(wakeUpBackend, 3000);
      }
    };

    wakeUpBackend();
  }, []);

  if (import.meta.env.PROD && !isBackendReady) {
    return <BackendWakeupScreen connected={isConnected} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

createRoot(document.getElementById("root")!).render(<RootApp />);
