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
      messages: [{ role: "user", content: question }],
      model: "deepseek-chat",
      max_tokens: 500,
      temperature: 0.7,
    });

    if (completion.choices && completion.choices.length > 0) {
      return NextResponse.json({
        answer: completion.choices[0].message.content
      });
    } else {
      return NextResponse.json(
        { error: "Unexpected response from DeepSeek API" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching DeepSeek API:", error);
    return NextResponse.json(
      { error: `An error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}