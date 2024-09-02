import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'user',
            content: `Generate 10 flashcards. For each flashcard, provide text for the "front" and "back". Only output the front and back text, formatted like this: "front: <front text> back: <back text>".`,
          },
        ],
      }),
    });

    const data = await response.json();
    const flashcards = data.choices[0].message.content.split('\n').map(line => {
      const [front, back] = line.replace('front:', '').replace('back:', '').split('back:');
      return { front: front.trim(), back: back.trim() };
    });

    return NextResponse.json({ results: flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
}
