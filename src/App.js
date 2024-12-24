import React, { useState, useEffect } from 'react';
import './App.css';
import Basic from './components/basic';
import { getTopTracksInDateRange } from './SpotifyService';

function App() {
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    // Fetch top tracks when the app loads
    const fetchData = async () => {
      const tracks = await getTopTracksInDateRange();
      setTrackData(tracks);
    };
    fetchData();
  }, []);

  // Function to transform the Spotify track data into heatmap format
  const transformTrackData = () => {
    return trackData.map((track) => {
      return {
        date: new Date(track.added_at).toISOString().split('T')[0], // format date as YYYY-MM-DD
        count: track.popularity, // Use track popularity as the count (you can use other metrics like play count)
      };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        Heatmap of Spotify Listening Activity
      </header>
      <Basic commitsData={transformTrackData()} />
    </div>
  );
}

export default App;
