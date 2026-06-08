export async function onRequest(context) {
  let channel = context.params.channel || "sp0012";
  
  // .m3u8 extension remove
  channel = channel.replace(/\.m3u8$/, '').replace(/[^a-zA-Z0-9_]/g, '');

  try {
    const res = await fetch("https://icy-rain-853b.himelhimubd1.workers.dev/?channel=" + channel, {
      headers: { "Accept": "application/json" }
    });
    const data = await res.json();
    if (data.playback_url) return Response.redirect(data.playback_url, 302);
    return new Response("Live নেই।", { status: 404 });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}
