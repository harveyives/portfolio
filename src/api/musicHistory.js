export function fetchMusicHistory() {
    const username = 'harveyives';

    return fetch(
        `.netlify/functions/lastFm?username=${username}`
    ).then(response => response.json());
}
