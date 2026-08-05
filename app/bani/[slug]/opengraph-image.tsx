import { ImageResponse } from "next/og";
import { getBaniBySlug } from "@/lib/gurbani";

export const runtime = "nodejs";

export const alt = "Sikh Gurbani Online - Nitnem Scripture Reader";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const bani = await getBaniBySlug(resolvedParams.slug);

  const titleGurmukhi = bani ? bani.name.gurmukhi : "ਸਿੱਖ ਗੁਰਬਾਣੀ";
  const titleEnglish = bani ? bani.name.en : "Sikh Gurbani";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage: "radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.15), transparent 70%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
          padding: "48px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            color: "#f59e0b",
            fontSize: "18px",
            fontWeight: "600",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          <span>Sikh Gurbani Online</span>
        </div>

        {/* Gurmukhi Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "#ffffff",
            margin: "0 0 16px 0",
            lineHeight: "1.2",
          }}
        >
          {titleGurmukhi}
        </h1>

        {/* English Title */}
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "500",
            color: "#a1a1aa",
            margin: "0 0 32px 0",
          }}
        >
          {titleEnglish}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "20px",
            color: "#71717a",
            margin: 0,
          }}
        >
          Read in Gurmukhi with English & Hindi Translations • Larivaar Mode Available
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
