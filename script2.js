import {config} from "dotenv";
config();

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "I am Phineas. I am a student in Sheridan College. I love reading and music. I also work out everyday. Summarize this paragraph into a profiler with keyword-value" }],
    model: "gpt-3.5-turbo-1106",
  });

  console.log(completion.choices[0]);
}

main();