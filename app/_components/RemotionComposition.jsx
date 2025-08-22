import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionComposition = ({ videoData, setDurationInFrame }) => {
  const { fps } = useVideoConfig();
  const captions = videoData?.captionJson;
  const imageList = videoData?.images;
  const frame = useCurrentFrame();

  useEffect(() => {
    videoData && getDurationFrame();
  }, [videoData]);

  const getDurationFrame = () => {
    const totalDuration = captions[captions?.length - 1]?.end * fps;
    console.log(totalDuration);
    setDurationInFrame(totalDuration);
    return totalDuration;
  };

  const getCurrentCaption = () => {
    const currentTime = frame / 30;
    const currentCaption = captions?.find(
      (item) => currentTime > -item?.start && currentTime <= item?.end
    );
    return currentCaption ? currentCaption?.word : "";
  };

  return (
    <div>
      <AbsoluteFill>
        {imageList.map((item, index) => {
          // this is for show all images of video
          const startTime = (index * getDurationFrame()) / imageList?.length;
          const duration = getDurationFrame();

          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

          rreturn(
            <>
              <Sequence
                key={index}
                from={startTime}
                durationInFrames={getDurationFrame()}
              >
                <AbsoluteFill>
                  <Img
                    src={item}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `scale (${scale(index)})`,
                    }}
                  />
                </AbsoluteFill>
              </Sequence>
            </>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          color: "white",
          justifyContent: "center",
          bottom: 50,
          height: 150,
          textAlign: "center",
        }}
      >
        <h2> {getCurrentCaption()} </h2>
      </AbsoluteFill>
      {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}{" "}
      {/*this is for audio in video*/}
    </div>
  );
};

export default RemotionComposition;
