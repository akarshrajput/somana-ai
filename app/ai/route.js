import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI("AIzaSyDBqoW36LDdmrGoOcjUUtfhR0-9GAnaxrA");

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Return the generated text as JSON response
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    // Return an error response with status code 500
    return NextResponse.json(
      { error: "Error generating content" },
      { status: 500 }
    );
  }
}

// Handling unsupported methods
export async function handler(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
