const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// // Correctly named and exported
// export const model = genAI.getGenerativeModel({
//   model: "gemini-pro",
// });

// //Correctly named with an uppercase 'C' and exported
// export const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a different script for 30 second video",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n {\n "scripts":[\n {\n "}]    ',
        },
      ],
    },
  ],
});

export const GenerateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Image prompt of style with all details for each scene for 30 seconds",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: '```json\n {\n "imagePrompt":[\n {\n "}]    ' }],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE")
// console.log(result.response.text());
