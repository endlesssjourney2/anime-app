import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="bottom-right"
        theme="dark"
        duration={3000}
        visibleToasts={3}
        closeButton
        toastOptions={{
          style: {
            background: "var(--color-card)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
          },
        }}
      />
    </AuthProvider>
  </StrictMode>,
);
