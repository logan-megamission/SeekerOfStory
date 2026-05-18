function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function VideoEmbed({ url }: { url: string }) {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="bg-charcoal aspect-video flex items-center justify-center mb-6">
        <p className="text-white/30 font-serif italic text-[1.1rem]">
          ▶ &nbsp; Ride &amp; Share Interview
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video mb-6">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Ride & Share Interview"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="border-0"
      />
    </div>
  );
}
