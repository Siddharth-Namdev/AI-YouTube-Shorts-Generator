// Here we want to render our video  
"use client"
import React, { useEffect, useState } from 'react'
import RemotionPlayer from '../_components/RemotionPlayer'
import VideoInfo from '../_components/VideoInfo'
import { useParams } from 'next/navigation'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';


function PlayVideo(){
    const {videoId} = useParams();
    const convex = useConvex();
    const [videoData,setVideoData] = useState();

    useEffect(()=>{
        videoId&&GetVideoDataById();
    },[videoId])



    const GetVideoDataById = async()=>{
        const result = await convex.query(api.videoData.GetVideoById,{
            videoId:videoId
        })
        console.log(result);
        setVideoData(result);
    }
}

const PlayVideo = () => {
  return (
    <div>
        <div>
            {/* Remotion Player --> already created video with all images , audio and caption */} 
            
            <RemotionPlayer  videoData={videoData} />
        </div>
        <div>
            {/* Video Information  ---> video title and script of video */}
            <VideoInfo  videoData={videoData} />
        </div>
    </div>
  )
}

export default PlayVideo