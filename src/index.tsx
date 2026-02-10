import { Hono } from "hono";

const app = new Hono();

// OG Image endpoint
app.get("/api/og/:encoded", async (c) => {
  const encoded = c.req.param("encoded");
  try {
    const { generateOgImage } = await import("./server/og");
    const svg = await generateOgImage(encoded);
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return c.text("Failed to generate OG image", 500);
  }
});

export default app;
