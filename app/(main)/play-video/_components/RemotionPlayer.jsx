// --> use player option in Docs
"use client";
import React, { useState } from "react";
import { Player } from "@remotion/player";
import RemotionComposition from "@/app/_components/RemotionComposition";
import { useVideoConfig } from "remotion";

const RemotionPlayer = ({ videoData }) => {
 
    const [durationInFrames,setDurationInFrame] = useState(100)


  return (
    <div>
      {" "}
      <Player
        component={RemotionComposition}
        durationInFrames={Number(durationInFrames.toFixed(0))+100} //how long your video will be
        compositionWidth={720} // width of video
        compositionHeight={1280} // height of video
        fps={30} // frame per second
        controls
        style={{
            width:'25vw',
            height:'70vh'
        }}
        imputProps={{
          videoData: videoData,
          setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
        }}
      />
    </div>
  );
};

export default RemotionPlayer;
