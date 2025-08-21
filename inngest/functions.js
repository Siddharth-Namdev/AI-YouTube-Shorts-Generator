import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { GenerateImageScript } from "@/configs/AiModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import axios from "axios";

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each scene for 20 seconds vodeo:script:{script}
    - Just Give specifing image prompt depends on the story line
    - do not give camera angle image prompt
    - Follow the Following schema and return JSON data (Max 3-4 Images)
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
    const { script, topic, title, caption, recordId,credits, videoStyle, voice } =
      event?.data;

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    // Generate Audio File MP3 --> logic to generate audio form script
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      // ye code AIGURULAB se copy kiya h
      try {
        const result = await axios.post(
          BASE_URL + "/api/text-to-speech",
          {
            input: script,
            voice: voice,
          },
          {
            headers: {
              "x-api-key": process.env.AIGURULAB_API_KEY, // Your API Key
              "Content-Type": "application/json", // Content Type
            },
          }
        );
        console.log("Successfully generated audio:", result.data.audio); //Output Result: Audio Mp3 Url
        return result.data.audio;
      } catch (error) {
        console.error("The Aigurulab API call failed!");

        // THIS IS THE MOST IMPORTANT PART:
        // It will print the detailed error message from the server that crashed.
        console.error("Detailed error from Aigurulab:", error.response?.data);

        // Re-throw the error so Inngest knows the step failed
        throw error;
      }
    });

    // Generate Caption  --> this code is copy from deepgram , audio to text
    const GenerateCaptions = await step.run("generateCaptions", async () => {
      const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: GenerateAudioFile,
        },
        // STEP 3: Configure Deepgram options for audio analysis
        {
          model: "nova-3",
          smart_format: true,
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
                "x-api-key": process.env.AIGURULAB_API_KEY, // Your API Key
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

    //Save all data to database
    const UpdateDB = await step.run("UpdateDB", async () => {
      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioUrl: GenerateAudioFile,
        captionJson: GenerateCaptions,
        images: GenerateImages,
      });
      return result;
    });

    return "Executed Successfully";
  }
);
