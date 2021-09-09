export function fetchMusicHistory() {
  return fetch('/.netlify/functions/lastFm?username=harveyives').then(response => response.json());
}
