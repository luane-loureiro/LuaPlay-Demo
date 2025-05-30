export function getYoutubeId(u) {
  try {
    const o = new URL(u);
    if (o.hostname.includes("youtube.com") && o.searchParams.has("v"))
      return o.searchParams.get("v");
    if (o.hostname === "youtu.be") return o.pathname.slice(1);
    return null;
  } catch {
    return null;
  }
}

export function getEmbedUrl(u) {
  const videoId = getYoutubeId(u);
  if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  return u;
}

export const defaultLoadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        resolve(window.YT);
      };
    }
  });
};
