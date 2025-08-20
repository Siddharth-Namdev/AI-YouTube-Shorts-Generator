import { generateScript } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `write a two different script for 30 seconds video on topic : {topic}

Do not add scene description

Do not Add Anything in Braces,Just return the plain story in text
Give me response in JSON format and follow the schema
{
"scripts":[
{
"contents":""},
],
}`;

export async function POST(req) {
  const { topic } = await req.json();

  const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic);
  const result = await generateScript.sendMessage(PROMPT);
  const resp = result?.response?.text();

  return NextResponse.json(JSON.parse(resp));
}

// import { model, generationConfig } from "@/configs/AiModel"; // Import both model and config
// import { NextResponse } from "next/server";

// const SCRIPT_PROMPT = `write a two different script for 30 seconds video on topic : {topic}

// Do not add scene description
// Do not Add Anything in Braces,Just return the plain story in text
// Give me response in JSON format and follow the schema
// {
// "scripts":[
//   {"contents": "script one content..."},
//   {"contents": "script two content..."}
// ]
// }`;

// export async function POST(req) {
//   try {
//     const { topic } = await req.json();

//     if (!topic) {
//       return NextResponse.json({ error: "Topic is required." }, { status: 400 });
//     }

//     // Start a new chat session for every request
//     const chat = model.startChat({
//       generationConfig, // Use the imported config
//       history: [
//         // You can include examples here if needed, or leave it empty
//       ],
//     });

//     const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic);

//     const result = await chat.sendMessage(PROMPT);
//     const resp = result.response.text();

//     // Clean the response to ensure it's valid JSON
//     // The model sometimes wraps the JSON in ```json ... ```
//     const cleanedResp = resp.replace(/```json/g, "").replace(/```/g, "").trim();

//     try {
//       const parsedResponse = JSON.parse(cleanedResp);
//       return NextResponse.json(parsedResponse);
//     } catch (parseError) {
//       console.error("JSON parsing error:", parseError);
//       console.error("Raw response from Gemini:", resp); // Log the raw, problematic response
//       return NextResponse.json({
//         error: "Failed to parse Gemini response as JSON. The format was invalid.",
//       }, { status: 500 });
//     }
//   } catch (error) {
//     console.error("Gemini API error:", error);
//     return NextResponse.json({ error: "Failed to generate script from Gemini API." }, { status: 500 });
//   }
// }