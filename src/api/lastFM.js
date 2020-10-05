export function fetchMusicHistory() {
  const username = 'harveyives';
  const apiKey = process.env.LASTFM_API_KEY;
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;
  return fetch(url).then(response => response.json());
}
