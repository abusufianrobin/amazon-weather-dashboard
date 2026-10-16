import axios from 'axios';

const WEATHER_KEY = process.env.WEATHER_API_KEY;
const YOUTUBE_KEY = process.env.YOUTUBE_API_KEY;
const WINDY_KEY = process.env.WINDY_API_KEY;

export async function fetchDashboardData(city: string = 'London') {
  try {
    // 1. Weather API Request
    const weatherRes = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${encodeURIComponent(city)}`
    );

    const conditionText = weatherRes.data?.current?.condition?.text || 'weather';

    // 2. YouTube Search API Request
    const youtubeRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          q: `${city} ${conditionText}`,
          type: 'video',
          maxResults: 3,
          key: YOUTUBE_KEY,
        },
      }
    );

    // 3. Windy Webcam API v3 Request
    const webcamRes = await axios.get(
      `https://api.windy.com/webcams/api/v3/webcams/1170927034`,
      {
        params: {
          include: 'images,location,player',
        },
        headers: {
          'x-windy-api-key': WINDY_KEY,
        },
      }
    );

    return {
      weather: weatherRes.data,
      youtube: youtubeRes.data?.items || [],
      webcam: webcamRes.data || null,
    };
  } catch (error) {
    console.error('Error fetching dashboard feeds:', error);
    throw new Error('Failed to retrieve external API data.');
  }
}