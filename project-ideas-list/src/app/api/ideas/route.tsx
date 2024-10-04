import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const ideasCookie = cookieStore.get('ideas')
  const ideas = ideasCookie ? JSON.parse(ideasCookie.value) : []
  return NextResponse.json(ideas)
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const ideasCookie = cookieStore.get('ideas')
  const ideas = ideasCookie ? JSON.parse(ideasCookie.value) : []
  const newIdea = await request.json()
  const idea = {
    id: ideas.length + 1,
    ...newIdea,
    completed: false
  }
  ideas.push(idea)
  cookieStore.set('ideas', JSON.stringify(ideas))
  return NextResponse.json(idea)
}

export async function PUT(request: Request) {
  const cookieStore = cookies()
  const ideasCookie = cookieStore.get('ideas')
  let ideas = ideasCookie ? JSON.parse(ideasCookie.value) : []
  const updatedIdea = await request.json()
  ideas = ideas.map((idea: any) => 
    idea.id === updatedIdea.id ? { ...idea, ...updatedIdea } : idea
  )
  cookieStore.set('ideas', JSON.stringify(ideas))
  return NextResponse.json(updatedIdea)
}