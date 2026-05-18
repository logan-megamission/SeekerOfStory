import Link from "next/link";

const SPOTIFY_SHOW = "https://open.spotify.com/show/033gnWzSSrzzX3j6xw4Q4u";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@SeekerofStory";
const APPLE_PODCASTS =
  "https://podcasts.apple.com/us/podcast/sos-susy-gordon-seeker-of-story/id1896645220";

function SpotifyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ApplePodcastsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.34 0A5.328 5.328 0 0 0 0 5.34v13.32A5.328 5.328 0 0 0 5.34 24h13.32A5.328 5.328 0 0 0 24 18.66V5.34A5.328 5.328 0 0 0 18.66 0zm7.066 4.01c2.066 0 3.99.8 5.422 2.232A7.601 7.601 0 0 1 20.06 11.7c0 2.065-.8 3.99-2.232 5.421a7.6 7.6 0 0 1-5.421 2.232 7.601 7.601 0 0 1-5.422-2.232A7.6 7.6 0 0 1 4.753 11.7c0-2.065.8-3.99 2.232-5.421A7.601 7.601 0 0 1 12.406 4.01zM12 6.898a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 1.8a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6zm0 1.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/35 text-center py-10 px-6 text-[0.68rem] tracking-[0.1em]">
      <div className="flex items-center justify-center gap-6 mb-6">
        <Link
          href={SPOTIFY_SHOW}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Listen on Spotify"
          className="text-white/40 hover:text-[#1DB954] transition-colors duration-200"
        >
          <SpotifyIcon />
        </Link>
        <Link
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch on YouTube"
          className="text-white/40 hover:text-[#FF0000] transition-colors duration-200"
        >
          <YoutubeIcon />
        </Link>
        <Link
          href={APPLE_PODCASTS}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Listen on Apple Podcasts"
          className="text-white/40 hover:text-[#A855F7] transition-colors duration-200"
        >
          <ApplePodcastsIcon />
        </Link>
      </div>

      <p>
        <strong className="text-gold">Seeker of Story</strong>
        &nbsp;·&nbsp; Fort Worth, TX &nbsp;·&nbsp; Matthew 7:7
      </p>
      <br />
      <p>
        Powered by <strong className="text-gold">Mega Mission Media</strong>
        &nbsp;·&nbsp;
        <Link href="tel:8178608989" className="text-gold hover:text-gold-light transition-colors">
          817-860-8989
        </Link>
        &nbsp;·&nbsp; megamissionmedia.com
      </p>
      <br />
      <p>© 2026 Seeker of Story. All rights reserved. No paywalls. No subscriptions. Always free.</p>
    </footer>
  );
}
