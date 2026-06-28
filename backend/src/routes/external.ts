import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Spotify cache interfaces
interface TokenCache {
  accessToken: string;
  expiresAt: number; // timestamp in ms
}

interface NowPlayingCache {
  data: {
    title: string;
    artist: string;
    albumArt: string;
    spotifyUrl: string;
    isPlaying: boolean;
    lastPlayedAt?: string;
  };
  timestamp: number; // timestamp in ms
}

let tokenCache: TokenCache | null = null;
let nowPlayingCache: NowPlayingCache | null = null;
const NOW_PLAYING_CACHE_DURATION = 30 * 1000; // 30 seconds

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60000) {
    return tokenCache.accessToken;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenResponse = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const { access_token, expires_in } = tokenResponse.data;
  tokenCache = {
    accessToken: access_token,
    expiresAt: now + (expires_in * 1000)
  };
  return access_token;
}

// Spotify proxy
router.get('/spotify/now-playing', async (req, res) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  const fallbackData = {
    title: 'The Fate of Ophelia',
    artist: 'Taylor Swift',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273d7812467811a7da6e6a44902',
    spotifyUrl: 'https://open.spotify.com/track/53iuhJlwXhSER5J2IYYv1W',
    isPlaying: false,
    lastPlayedAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  };

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(200).json(fallbackData);
  }

  const now = Date.now();
  if (nowPlayingCache && (now - nowPlayingCache.timestamp) < NOW_PLAYING_CACHE_DURATION) {
    return res.status(200).json(nowPlayingCache.data);
  }

  try {
    const access_token = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN);

    const nowPlayingRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (nowPlayingRes.status === 204 || nowPlayingRes.status > 400 || !nowPlayingRes.data) {
      const recentRes = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (recentRes.data && recentRes.data.items && recentRes.data.items.length > 0) {
        const playHistory = recentRes.data.items[0];
        const item = playHistory.track;
        const payload = {
          title: item.name,
          artist: item.artists.map((a: any) => a.name).join(', '),
          albumArt: item.album.images[0].url,
          spotifyUrl: item.external_urls.spotify,
          isPlaying: false,
          lastPlayedAt: playHistory.played_at
        };
        nowPlayingCache = { data: payload, timestamp: now };
        return res.status(200).json(payload);
      }
      throw new Error('Spotify player inactive');
    }

    const { item, is_playing } = nowPlayingRes.data;
    const payload = {
      title: item.name,
      artist: item.artists.map((a: any) => a.name).join(', '),
      albumArt: item.album.images[0].url,
      spotifyUrl: item.external_urls.spotify,
      isPlaying: is_playing,
      lastPlayedAt: is_playing ? undefined : new Date().toISOString()
    };
    nowPlayingCache = { data: payload, timestamp: now };
    res.status(200).json(payload);
  } catch (error) {
    // If Spotify query fails, fall back to our cache if we have one, otherwise return default fallback
    if (nowPlayingCache) {
      return res.status(200).json(nowPlayingCache.data);
    }
    res.status(200).json(fallbackData);
  }
});

// GitHub Contributions proxy
router.get('/github/contributions', async (req, res) => {
  const { GITHUB_TOKEN, GITHUB_USERNAME } = process.env;
  if (!GITHUB_TOKEN) {
    return res.status(404).json({ message: 'GitHub token not configured' });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      {
        query,
        variables: { username: GITHUB_USERNAME || 'geetikavasistha-01' }
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const calendar = response.data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      throw new Error('Invalid GitHub response');
    }

    res.status(200).json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks
    });
  } catch (error) {
    res.status(404).json({ message: 'GitHub proxy query failed' });
  }
});

export default router;
