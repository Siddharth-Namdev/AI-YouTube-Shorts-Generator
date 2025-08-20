import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { GenerateImageScript } from "@/configs/AiModel";

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each scene for 30 seconds vodeo:script:{script}
    - Just Give specifing image prompt depends on the story line
    - do not give camera angle image prompt
    - Follow the Following schema and return JSON data (Max 6-7 Images)
    - [
    {
    imagePrompt:'',
    sceneContent:<script Content>
    }]   `;

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const BASE_URL = "https://aigurulab.tech"; // from AIGRURLAB
export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, topic, caption, videoStyle, voice } = event?.data;

    // Generate Audio File MP3 --> logic to generate audio form script
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      // ye code AIGURULAB se copy kiya h
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


    // Generate Caption  --> this code is copy from deepgram , audio to text
    const GenerateCaptions = await step.run("generateCaptions", async () => {
      const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: GenerateAudioFile,
        },
        // STEP 3: Configure Deepgram options for audio analysis
        {
          model: "nova-3",
        }
      );
      return result.results?.channels[0]?.alternatives[0]?.words;
    });


    // Generate Image Prompt from Script
    const GenerateImagePrompts = await step.run(
      "generateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImagePromptScript.replace(
          "{style}",
          videoStyle
        ).replace("{script}", script);
        const result = await GenerateImageScript.sendMessage(FINAL_PROMPT);
        const resp = JSON.parse(result.response.text());
        return resp;
      }
    );

    //Generate Images Using image prompt (using AI guru LAb)

    const GenerateImages = await step.run("generateImage", async () => {
      let images = [];
      images = await Promise.all(
        GenerateImagePrompts.map(async (element) => {
          const result = await axios.post(
            // this code is copy from AI Guru Lab
            BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: element?.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          console.log(result.data.image); //Output Result: Base 64 Image
          return result.data.image;
        })
      );
      return images;
    });


    

    return GenerateImages;
  }
);
