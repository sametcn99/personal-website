import { ImageResponse } from "next/og";

export async function generateOgImage(title: string, subtitle?: string) {
  let fontData: ArrayBuffer | null = null;

  try {
    // Attempt to fetch the Inter font from Google Fonts
    // We use a try/catch block to ensure that if the font fetch fails (e.g. network issues),
    // the image is still generated with a fallback font.
    const response = await fetch(
      new URL(
        "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.ttf",
        "https://fonts.google.com/",
      ),
    );
    if (response.ok) {
      fontData = await response.arrayBuffer();
    } else {
      console.error(
        `Failed to fetch font: ${response.status} ${response.statusText}`,
      );
    }
  } catch (e) {
    console.error("Error fetching font for OG image:", e);
  }

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0e0e0e",
        color: "#b0b0b0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ededed", // Lighter than primary text for better contrast on OG
            marginBottom: subtitle ? 24 : 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 32,
              color: "#999",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 28,
          color: "#555",
          fontWeight: 400,
        }}
      >
        sametcc.me
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [
            {
              name: "Inter",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined, // Fallback to system fonts if fetch fails
    },
  );
}
