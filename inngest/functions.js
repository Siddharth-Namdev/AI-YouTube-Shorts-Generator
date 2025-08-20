import axios from "axios";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const BASE_URL = "https://aigurulab.tech";  // from AIGRURLAB
export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, topic, caption, videoStyle, voice } = event?.data;

    // Generate Audio File MP3 --> logic to generate audio form script
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {  // ye code AIGURULAB se copy kiya h
      const result = await axios.post(
        BASE_URL + "/api/text-to-speech",
        {
          input: script,
          voice: voice,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
            "Content-Type": "application/json", // Content Type
          },
        }
      );
      console.log(result.data.audio); //Output Result: Audio Mp3 Url
      return result.data.audio;
    });

    // Generate Caption

    // Generate Image Prompt from Script

    //Generate Images Using AI


    return GenerateAudioFile
  }
);
