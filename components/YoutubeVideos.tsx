'use client';

import React from 'react';
import { Video } from 'lucide-react';

export default function YoutubeVideos({ videos }: { videos: any[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Video className="text-red-500 w-5 h-5" />
        <h3 className="text-lg font-bold">Live Regional Broadcasts</h3>
      </div>

      {videos.length === 0 ? (
        <p className="text-slate-500 text-sm">No video streams found for this query.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((vid) => (
            <div
              key={vid.id?.videoId || vid.snippet?.title}
              className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 flex flex-col"
            >
              <iframe
                className="w-full h-44"
                src={`https://www.youtube.com/embed/${vid.id?.videoId}`}
                title={vid.snippet?.title || 'YouTube video player'}
                allowFullScreen
              />
              <div className="p-3">
                <h4 className="text-sm font-semibold line-clamp-2 text-slate-200">
                  {vid.snippet?.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{vid.snippet?.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}