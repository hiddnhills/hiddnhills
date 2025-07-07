import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { performanceMonitor } from "./utils/performance";
import {
  initializeOptimizations,
  reportWebVitals,
} from "./utils/build-optimization";

// Start performance monitoring
performanceMonitor.start("app-initialization");

// Initialize optimizations immediately
initializeOptimizations();

// Get root element with error handling
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Create React root with concurrent features
const root = createRoot(rootElement);

// Render app directly without complex scheduling
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

  // End performance monitoring
  performanceMonitor.end("app-initialization");

  // Report initial metrics
  const metrics = performanceMonitor.getMetrics();
  console.log("🚀 App initialized:", metrics);
} catch (error) {
  console.error("Failed to render app:", error);

  // Render error fallback
  root.render(
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(26, 26, 26)", // Use artistic-charcoal color
        color: "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p>Please refresh the page</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "rgb(192, 192, 192)",
            color: "black",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </div>
    </div>,
  );
}

// Setup web vitals reporting in production (when library is available)
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  // Only attempt to load web-vitals if it's actually installed
  // This is commented out to prevent build errors when package isn't installed
  // import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  //   getCLS(reportWebVitals);
  //   getFID(reportWebVitals);
  //   getFCP(reportWebVitals);
  //   getLCP(reportWebVitals);
  //   getTTFB(reportWebVitals);
  // }).catch(() => {
  //   console.warn("Web vitals library not available");
  // });

  console.log(
    "Web vitals monitoring ready (install web-vitals package to enable)",
  );
}
