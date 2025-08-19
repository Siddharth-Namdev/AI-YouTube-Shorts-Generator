import React, { useState } from "react";

const options = [
  {
    name: "Youtuber",
    style: "text-2xl font-bold text-red-600 uppercase tracking-wider",
  },
  {
    name: "Supreme",
    style: "text-3xl font-extrabold bg-black text-white px-3 py-1 inline-block",
  },
  {
    name: "Neon Glow",
    style: "text-xl font-semibold text-pink-500 drop-shadow-[0_0_10px_#ec4899]",
  },
  {
    name: "Luxury Gold",
    style: "text-2xl font-bold text-yellow-500 tracking-wide",
  },
  {
    name: "Minimal Clean",
    style: "text-lg font-medium text-gray-700",
  },
  {
    name: "Retro 90s",
    style:
      "text-2xl font-extrabold text-purple-700 italic underline decoration-dotted",
  },
  {
    name: "Tech Futuristic",
    style: "text-lg font-mono text-cyan-400 uppercase tracking-widest",
  },
  {
    name: "Comic Fun",
    style: "text-xl font-bold text-orange-500 rotate-2",
  },
  {
    name: "Elegant Serif",
    style: "text-2xl font-serif font-semibold text-indigo-700",
  },
  {
    name: "Dark Mode Highlight",
    style: "text-xl font-bold text-white bg-gray-900 px-2 py-1 rounded",
  },
];

const Captions = ({ onHandleInputChange }) => {
  const [selectedCaptionStyle, setSelectedCaptionStyle] = useState();
  return (
    <div className="mt-5">
      <h2>Captions Style</h2>
      <p className="text-sm text-gray-400">Select Caption Style</p>

      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCaptionStyle(option.name);
              onHandleInputChange(option);
            }}
            className={`p-2 bg-slate-900 hover:border
                 border-gray-400 cursor-pointer  rounded-lg 
                 ${selectedCaptionStyle==option.name && 'border'}`}
          >
            <h2 className={option.style}>{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Captions;
