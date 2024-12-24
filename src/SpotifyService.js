import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: '542da89152c8400d846177b74791db49',
  clientSecret: 'dcc5a6c7f54743cb98ff728869c24b28',
});

// Function to get the Spotify token
const getSpotifyAccessToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
};

// Function to fetch top tracks for a given date range (Jan 2024 to Oct 2024)
const getTopTracksInDateRange = async () => {
  await getSpotifyAccessToken(); // Get the token

  // Create an array of months in the date range
  const monthsInRange = [
    { year: 2024, month: 0 }, // January
    { year: 2024, month: 1 }, // February
    { year: 2024, month: 2 }, // March
    { year: 2024, month: 3 }, // April
    { year: 2024, month: 4 }, // May
    { year: 2024, month: 5 }, // June
    { year: 2024, month: 6 }, // July
    { year: 2024, month: 7 }, // August
    { year: 2024, month: 8 }, // September
    { year: 2024, month: 9 }, // October
  ];

  const allTracks = [];

  for (let i = 0; i < monthsInRange.length; i++) {
    const { year, month } = monthsInRange[i];

    // Convert the month and year into a Unix timestamp for the start and end of each month
    const startDate = new Date(year, month, 1).toISOString();  // Start of the month
    const endDate = new Date(year, month + 1, 0).toISOString();  // End of the month (last day)

    try {
      // Fetch tracks for the month by setting the time_range to 'short_term' for each request
      const response = await spotifyApi.getTopTracksForPeriod({ limit: 50, time_range: 'short_term' });

      // Collect all tracks for the range
      allTracks.push(...response.body.items);
    } catch (error) {
      console.error(`Error fetching tracks for ${year}-${month + 1}:`, error);
    }
  }

  // Return all fetched tracks
  return allTracks;
};

export { getTopTracksInDateRange };
