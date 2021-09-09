export function fetchMusicHistory() {
  const username = 'harveyives';

  return fetch('/.netlify/functions/lastFm?username=harveyives').then(response => response.json());
}
