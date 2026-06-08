export async function onRequest({ request }) {
  const url = new URL(request.url);
  const channel = (url.searchParams.get("channel") || "sp0012")
    .replace(/[^a-zA-Z0-9_]/g, '');

  try {
    const res = await fetch(
      https://icy-rain-853b.himelhimubd1.workers.dev/?channel=${channel},
      { headers: { "Accept": "application/json" } }
    );
    const data = await res.json();
    const playback_url = data?.playback_url ?? '';

    if (playback_url) return Response.redirect(playback_url, 302);
    return new Response("Channel live নেই।", { status: 404 });

  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}
