import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ordine Ermetico",
    short_name: "Ordine Ermetico",
    description: "French import and distribution house for India. Reims, France.",
    start_url: "/",
    display: "browser",
    background_color: "#F4F0E8",
    theme_color: "#111111",
    icons: [
      { src: "/icon.png", type: "image/png", sizes: "512x512" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
