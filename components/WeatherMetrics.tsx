'use client';

import React from 'react';
import { Thermometer, Wind, Droplets, Compass } from 'lucide-react';

export default function WeatherMetrics({ weather }: { weather: any }) {
  if (!weather || !weather.current) return null;

  const { current, location } = weather;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{location.name}, {location.country}</h2>
          <p className="text-slate-400 text-sm">Amazon Regional Operations Center</p>
        </div>
        {current.condition?.icon && (
          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="w-14 h-14"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <Thermometer className="text-amber-500 w-6 h-6" />
          <div>
            <p className="text-slate-400 text-xs">Temperature</p>
            <p className="text-xl font-bold">{current.temp_c}°C / {current.temp_f}°F</p>
          </div>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <Wind className="text-blue-400 w-6 h-6" />
          <div>
            <p className="text-slate-400 text-xs">Wind Speed</p>
            <p className="text-xl font-bold">{current.wind_kph} km/h</p>
          </div>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <Droplets className="text-cyan-400 w-6 h-6" />
          <div>
            <p className="text-slate-400 text-xs">Humidity</p>
            <p className="text-xl font-bold">{current.humidity}%</p>
          </div>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <Compass className="text-emerald-400 w-6 h-6" />
          <div>
            <p className="text-slate-400 text-xs">Condition</p>
            <p className="text-base font-bold truncate">{current.condition?.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}