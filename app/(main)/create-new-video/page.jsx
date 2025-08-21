"use client";
import React, { useState } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import { Button } from "@/components/ui/button";
import { Loader2Icon, WandSparkles } from "lucide-react";
import Preview from "./_components/Preview";
import axios from "axios";
import { useMutation } from "convex/react";
import { useAuthContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState({});
  const { user } = useAuthContext(); // user jo jo v select krega , wo isme save hoga

  //const CreateInitialVidoRecord = useMutation(api.videoData.CreateVideoData);
  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);

  const [loading, setLoading] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };

  const GenerateVideo = async () => {
    if (user?.credits <= 0) {
      toast("Please add more credits!");
      return;
    }

    if (
      !formData?.topic ||
      !formData?.script ||
      !formData?.videoStyle ||
      !formData?.voice ||
      !formData?.caption
    ) {
      console.log("ERROR", "Enter ALL fields");
      return;
    }

    setLoading(true);

    // save video data first
    const resp = await CreateInitialVideoRecord({
      title: formData.title,
      topic: formData.topic,
      script: formData.script,
      videoStyle: formData.videoStyle,

      caption: formData.caption,
      voice: formData.voice,
      uid: user?._id,
      createdBy: user?.email || "Guest",
      credits: user?.credits,
    });
    console.log(resp);

    const result = await axios.post("/api/generate-video-data", {
      ...formData,
      recordId: resp, // iD of record
    });
    console.log(result);
    setLoading(false);
  };
  return (
    <div>
      <h2 className="text-3xl ">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className="col-span-2 p-7 border rounded-2xl h-[74vh] overflow-auto ">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />
          {/* Video Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          {/*     Voice  */}
          <Voice onHandleInputChange={onHandleInputChange} />
          {/* Captions */}
          <Captions onHandleInputChange={onHandleInputChange} />

          <Button
            className="w-full mt-5"
            onClick={GenerateVideo}
            disabled={loading}
          >
            {" "}
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <WandSparkles />
            )}
            Generate Video
          </Button>
        </div>
        <div>
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
