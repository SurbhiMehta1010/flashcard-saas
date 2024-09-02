import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, topic } = await req.json();

    if (!prompt || !topic) {
      throw new Error('Both prompt and topic are required.');
    }

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
            content: `Please create 10 flashcards from the following text for the topic "${topic}". Each flashcard should have a "front" and "back". Only output the front and back text without any numbers or bullets.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices) {
      throw new Error(data.error || 'Failed to generate flashcards');
    }

    const content = data.choices[0].message.content;

    const flashcards = content.split('\n').reduce((cards, line) => {
      const [front, back] = line.split('back:');
      if (front && back) {
        cards.push({
          front: front.replace('front:', '').trim(),
          back: back.trim(),
        });
      }
      return cards;
    }, []);

    return NextResponse.json({ results: flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to generate flashcards' }, { status: 500 });
  }
}
