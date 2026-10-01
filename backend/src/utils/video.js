/**
 * The frontend renders `videoUrl` differently depending on `videoType`:
 *   file    -> <video src>
 *   youtube -> <iframe src="https://www.youtube.com/embed/ID">
 *   vimeo   -> <iframe src="https://player.vimeo.com/video/ID">
 * Admins paste normal share links, so we work out the type and the embed URL here.
 */

function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function detectVideoType(value) {
  const url = parseUrl(value);
  if (!url) return "file"; // relative path or something we can't parse
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    return "youtube";
  }
  if (host.endsWith("vimeo.com")) return "vimeo";
  return "file";
}

export function toEmbedUrl(value, type = detectVideoType(value)) {
  const url = parseUrl(value);
  if (!url) return value;

  if (type === "youtube") {
    let id = null;
    if (url.hostname.replace(/^www\./, "") === "youtu.be") {
      id = url.pathname.split("/")[1];
    } else if (url.pathname === "/watch") {
      id = url.searchParams.get("v");
    } else {
      id = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{6,})/)?.[1];
    }
    return id ? `https://www.youtube.com/embed/${id}` : value;
  }

  if (type === "vimeo") {
    if (url.hostname === "player.vimeo.com") return value;
    const id = url.pathname.match(/\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : value;
  }

  return value;
}
