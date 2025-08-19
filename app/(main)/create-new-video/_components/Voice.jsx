import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";

const voiceOptions = [
  // this is come from Ai Guru Lab
  {
    value: "af_sarah",
    name: "Sarah (Female)",
  },
  {
    value: "af_sky",
    name: "Sky (Female)",
  },
  {
    value: "am_adam",
    name: "Adam (Male)",
  },
  {
    value: "hf_alpha",
    name: "Alpha (Female)",
  },
  {
    value: "af_beta",
    name: "Beta (Female)",
  },
  
];

const Voice = ({onHandleInputChange}) => {
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
              onClick={() => {selectedVoice(voice.name);
                onHandleInputChange('voice',voice.value)}
              }
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
