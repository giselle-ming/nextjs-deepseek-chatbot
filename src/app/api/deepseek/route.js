import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant, please answer the question.",
        },
        { role: "user", content: question },
      ],
      model: "deepseek-chat",
      max_tokens: 500,
      temperature: 0.7,
    });

    if (completion.choices && completion.choices.length > 0) {
      return NextResponse.json({
        answer: completion.choices[0].message.content,
      });
    } else {
      console.error("Unexpected API response:", completion);
      return NextResponse.json(
        { error: "Unexpected response from DeepSeek API" },
        { status: 500 }
      );
    }
  } catch (apiError) {
    console.error("DeepSeek API Error:", apiError);
    return NextResponse.json(
      { error: `API Error: ${apiError.message}` },
      { status: 502 }
    );
  }
}
