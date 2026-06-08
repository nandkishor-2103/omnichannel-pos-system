import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useRef, useState } from "react";

import App from "./App";
import "./index.css";

import { store, persistor } from "./app/store";

import BackendWakeupScreen from "./components/shared/BackendWakeupScreen";

export function RootApp() {
  const [isBackendReady, setIsBackendReady] = useState(!import.meta.env.PROD);

  const [isConnected, setIsConnected] = useState(false);

  const [showWakeupScreen, setShowWakeupScreen] = useState(false);

  const showWakeupScreenRef = useRef(false);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const backendUrl = apiBaseUrl.replace("/api", "");

    let retryTimer: ReturnType<typeof setTimeout>;

    const showScreenTimer = setTimeout(() => {
      showWakeupScreenRef.current = true;
      setShowWakeupScreen(true);
    }, 3000);

    const wakeUpBackend = async () => {
      try {
        const response = await fetch(`${backendUrl}/health`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Backend not ready");
        }

        clearTimeout(showScreenTimer);

        if (showWakeupScreenRef.current) {
          setIsConnected(true);

          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        setIsBackendReady(true);
      } catch {
        retryTimer = setTimeout(wakeUpBackend, 3000);
      }
    };

    wakeUpBackend();

    return () => {
      clearTimeout(showScreenTimer);

      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, []);

  if (import.meta.env.PROD && !isBackendReady && showWakeupScreen) {
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
