import fetch from 'node-fetch';

export async function fetchTweets(username: string) {
  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${username}/tweets`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tweets');
  }

  const data = await response.json();
  return data.data;
}
