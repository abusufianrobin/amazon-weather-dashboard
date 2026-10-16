'use client';

import React from 'react';
import { Camera } from 'lucide-react';

export default function WebcamPlayer({ webcamData }: { webcamData: any }) {
  const playerUrl = webcamData?.player?.day || webcamData?.player?.lifetime;
  const imagePreview = webcamData?.images?.current?.preview;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="text-emerald-400 w-5 h-5" />
        <h3 className="text-lg font-bold">Live Windy Webcam Surveillance Feed</h3>
      </div>

      {playerUrl ? (
        <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-800">
          <iframe
            src={playerUrl}
            className="w-full h-full border-0"
            title="Windy Webcam Stream"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : imagePreview ? (
        <img
          src={imagePreview}
          alt="Live Webcam Preview"
          className="w-full h-80 object-cover rounded-xl border border-slate-800"
        />
      ) : (
        <div className="w-full h-64 bg-slate-800/50 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500">
          Webcam Live Feed Unavailable
        </div>
      )}
    </div>
  );
}