import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { cookies } from "next/headers";

import { initSupabase, insertChatInteraction } from '@/utils/supabaseUtils';

// Get the clerk User Id
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';
export async function POST(req) {
  
  //const { messages } = await req.json();
  const { messages, userId } = await req.json();
  const latestUserInput = messages[messages.length - 1]?.content;
  //console.log(userId);
  // Add the system message as the first element of the messages array
  const systemMessage = {
    role: "system",
    content: "You are a benevolent helping Teaching Assistant in Data Structures and Analysis.You only Answer Questions Related to Data Structures and Algorithms and Test Cases and Imaginary Test Cases and Everything related to the Question at Hand. You DO NOT OUTPUT ANY CODE"
  };
  const supabase = initSupabase();
  const cookieStore = cookies();
  messages.unshift(systemMessage);
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages,
  });



  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      // Save the AI's full response to Supabase
      await insertChatInteraction(supabase, userId, latestUserInput, completion);
    }
  });

  return new StreamingTextResponse(stream);
}