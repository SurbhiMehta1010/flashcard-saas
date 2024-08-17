import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.text();

    console.log("Received data:", data); // Debugging

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${"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"}`, // Ensure your .env file has the correct key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "messages": [
          { "role": "user", "content": data }
        ],
      }),
    });

    if (!response.ok) {
      console.log("Failed response:", response); // Debugging
      throw new Error("Failed to generate flashcards");
    }

    const completion = await response.json();
    console.log("API response:", completion); // Debugging

    const flashcards = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
}
