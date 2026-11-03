"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/** App-wide toast outlet; follows the active next-themes colour scheme. */
export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === "light" ? "light" : "dark"}
      position="bottom-right"
      closeButton
      richColors
      toastOptions={{ classNames: { toast: "font-sans" } }}
    />
  );
}
