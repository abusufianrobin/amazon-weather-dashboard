'use client';

import React, { useEffect, useState } from 'react';
import Weather3DCanvas from '@/components/Weather3DCanvas';
import WeatherMetrics from '@/components/WeatherMetrics';
import WebcamPlayer from '@/components/WebcamPlayer';
import YoutubeVideos from '@/components/YoutubeVideos';
import { Search } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('London');
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async (targetCity: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard?city=${encodeURIComponent(targetCity)}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData(city);
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      {/* Executive Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-black font-extrabold px-2.5 py-0.5 rounded text-xs tracking-wider">
              AMAZON
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Weather Operations Intelligence Command
            </h1>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Real-time multi-API weather monitor powered by WeatherAPI, YouTube, & Windy
          </p>
        </div>

        {/* City Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 w-full md:w-80">
          <Search className="text-slate-400 w-4 h-4 mr-2" />
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city (e.g., London, Seattle)..."
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-slate-500"
          />
        </form>
      </header>

      {loading ? (
        <div className="h-96 flex items-center justify-center text-amber-500 font-medium">
          Syncing API feeds for Amazon Hub Operations...
        </div>
      ) : (
        data && (
          <div className="space-y-8">
            {/* Top Grid: 3D Visualization + Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Weather3DCanvas
                temp={data.weather?.current?.temp_c || 0}
                condition={data.weather?.current?.condition?.text || ''}
              />
              <WeatherMetrics weather={data.weather} />
            </div>

            {/* Middle Section: Windy Live Webcam */}
            <WebcamPlayer webcamData={data.webcam} />

            {/* Bottom Section: YouTube Live Feeds */}
            <YoutubeVideos videos={data.youtube} />
          </div>
        )
      )}
    </main>
  );
}