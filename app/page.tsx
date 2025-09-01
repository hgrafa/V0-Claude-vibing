"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, CheckCircle2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks")
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }))
        setTasks(parsedTasks)
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todo-tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = () => {
    const trimmedValue = inputValue.trim()

    // Input validation: no empty or whitespace-only tasks
    if (!trimmedValue) {
      return
    }

    // Task limit: maximum 10 tasks
    if (tasks.length >= 10) {
      return
    }

    // Automatic capitalization: first letter uppercase
    const capitalizedText = trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1)

    const newTask: Task = {
      id: Date.now().toString(),
      text: capitalizedText,
      completed: false,
      createdAt: new Date(),
    }

    setTasks((prev) => [...prev, newTask])
    setInputValue("")
  }

  const removeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const isAtTaskLimit = tasks.length >= 10
  const canAddTask = inputValue.trim() && !isAtTaskLimit

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
          </div>
          <p className="text-blue-600 font-medium">Get things done with style!</p>
        </div>

        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done? ✨"
                className="flex-1 border-2 border-blue-200 focus:border-blue-400 rounded-xl text-lg py-3 px-4"
                disabled={isAtTaskLimit}
              />
              <Button
                onClick={addTask}
                disabled={!canAddTask}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-600 font-medium">{tasks.length}/10 tasks</span>
              </div>
              {isAtTaskLimit && (
                <span className="text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full">Limit reached! 🎯</span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              className="shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm transform hover:-translate-y-1 leading-5"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardContent className="px-3 py-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full border-3 flex items-center justify-center transition-all duration-300 transform hover:scale-110",
                      task.completed
                        ? "bg-gradient-to-r from-blue-400 to-indigo-400 border-blue-400 text-white shadow-lg"
                        : "border-blue-300 hover:border-blue-400 hover:bg-blue-50",
                    )}
                  >
                    {task.completed && <CheckCircle2 className="h-3 w-3" />}
                  </button>

                  <span
                    className={cn(
                      "flex-1 transition-all duration-300 text-base",
                      task.completed ? "text-blue-400 line-through opacity-60" : "text-blue-900 font-medium",
                    )}
                  >
                    {task.text}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTask(task.id)}
                    className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 h-8 w-8 rounded-full transition-all duration-200 transform hover:scale-110"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-blue-500 font-medium">✨ Your tasks are magically saved ✨</div>
      </div>
    </div>
  )
}
