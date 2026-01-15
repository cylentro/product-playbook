"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) {
      console.log("[PWA] Service workers are not supported");
      return;
    }

    // Register the service worker
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        console.log("[PWA] Service Worker registered successfully");

        // Check for updates periodically
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New content is available, show update prompt
              console.log("[PWA] New content available, please refresh");
              
              // Dispatch custom event for update notification
              window.dispatchEvent(new CustomEvent("sw-update-available"));
            }
          });
        });

        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

      } catch (error) {
        console.error("[PWA] Service Worker registration failed:", error);
      }
    };

    // Register on load
    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
      return () => window.removeEventListener("load", registerSW);
    }
  }, []);

  return null;
}
