'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "../components/ui/checkbox"
import { PlusCircle, Search, Tag } from "lucide-react"

interface Idea {
  id: number
  title: string
  description: string
  tags: string[]
  completed: boolean
}

export default function ProjectIdeasList() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [filterText, setFilterText] = useState("")
  const [newIdea, setNewIdea] = useState({ title: "", description: "", tags: "" })

  useEffect(() => {
    const storedIdeas = localStorage.getItem('projectIdeas')
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('projectIdeas', JSON.stringify(ideas))
  }, [ideas])

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(filterText.toLowerCase()) ||
    idea.description.toLowerCase().includes(filterText.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(filterText.toLowerCase()))
  )

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = newIdea.tags.split(',').map(tag => tag.trim())
    const addedIdea = {
      id: Date.now(),
      title: newIdea.title,
      description: newIdea.description,
      tags,
      completed: false
    }
    setIdeas([...ideas, addedIdea])
    setNewIdea({ title: "", description: "", tags: "" })
  }

  const handleToggleComplete = (id: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, completed: !idea.completed } : idea
    ))
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Idea</h2>
        <form onSubmit={handleAddIdea} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title"
              value={newIdea.title}
              onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
              placeholder="Enter project title"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={newIdea.description}
              onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
              placeholder="Describe your project idea"
              required
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input 
              id="tags"
              value={newIdea.tags}
              onChange={(e) => setNewIdea({...newIdea, tags: e.target.value})}
              placeholder="e.g. AI, Web, Mobile"
            />
          </div>
          <Button type="submit" className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Idea
          </Button>
        </form>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <Label htmlFor="filter">Filter Ideas</Label>
          <div className="relative">
            <Input 
              id="filter"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search by title, description, or tags"
              className="pl-10"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <ul className="space-y-4">
          {filteredIdeas.map(idea => (
            <li key={idea.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${idea.completed ? 'line-through text-gray-500' : ''}`}>{idea.title}</h3>
                <Checkbox
                  id={`complete-${idea.id}`}
                  checked={idea.completed}
                  onCheckedChange={() => handleToggleComplete(idea.id)}
                />
              </div>
              <p className={`text-gray-600 mt-1 ${idea.completed ? 'line-through' : ''}`}>{idea.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {idea.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}