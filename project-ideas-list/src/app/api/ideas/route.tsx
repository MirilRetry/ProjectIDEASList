import { NextResponse } from 'next/server'

let ideas = [
  { id: 1, title: "Sample", description: "Sample text", tags: ["Next JS", "Javascript"] }
]

export async function GET() {
  return NextResponse.json(ideas)
}

export async function POST(request: Request) {
  const newIdea = await request.json()
  const idea = {
    id: ideas.length + 1,
    ...newIdea
  }
  ideas.push(idea)
  return NextResponse.json(idea)
}