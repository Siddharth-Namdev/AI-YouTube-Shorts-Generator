import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";

const voiceOptions = [
  // this is come from Ai Guru Lab
  {
    value: "am_adam",
    name: "🇺🇸 Adam (Male)",
  },
  {
    value: "af_sarah",
    name: "🇺🇸 Sarah (Female)",
  },
  {
    value: "af_sky",
    name: "🇬🇧 Sky (Female)",
  },
  {
    value: "in_ananya",
    name: "🇮🇳 Ananya (Female)",
  },
  {
    value: "in_raj",
    name: "🇮🇳 Raj (Male)",
  },
  {
    value: "au_olivia",
    name: "🇦🇺 Olivia (Female)",
  },
  {
    value: "au_liam",
    name: "🇦🇺 Liam (Male)",
  },
  {
    value: "fr_claire",
    name: "🇫🇷 Claire (Female)",
  },
  {
    value: "fr_pierre",
    name: "🇫🇷 Pierre (Male)",
  },
  {
    value: "jp_yui",
    name: "🇯🇵 Yui (Female)",
  },
  {
    value: "jp_haruto",
    name: "🇯🇵 Haruto (Male)",
  },
];

const Voice = ({ onHandleInputChange }) => {
  const [selectedVoice, setSelectedVoice] = useState();
  return (
    <div className="mt-5">
      <h2>Video Voice</h2>
      <p className="text-sm text-gray-400">Select voice for video</p>

      <ScrollArea className="h-[200px] w-full p-4">
        <div className="grid grid-cols-2 gap-1">
          {voiceOptions.map((voice, index) => (
            <h2
              className={`cursor-pointer hover:border p-3
                     dark:bg-slate-900 dark:border-white rounded-lg  
                     ${voice.name == selectedVoice && "border"}`}
              onClick={() => {
                setSelectedVoice(voice.name);
                onHandleInputChange("voice", voice.value);
              }}
              key={index}
            >
              {voice.name}
            </h2>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Voice;
