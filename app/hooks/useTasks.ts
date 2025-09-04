import { useState, useEffect } from "react"
import { Task } from "../types/task"
import { toast } from "sonner"

const STORAGE_KEY = "todo-tasks"
const MAX_TASKS = 10

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
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

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = (text: string) => {
    const trimmedText = text.trim()
    
    if (!trimmedText) return false
    if (tasks.length >= MAX_TASKS) return false

    const capitalizedText = trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1)

    const newTask: Task = {
      id: Date.now().toString(),
      text: capitalizedText,
      completed: false,
      createdAt: new Date(),
    }

    setTasks((prev) => [...prev, newTask])

    toast.success("Tarefa adicionada com sucesso! ✨", {
      description: capitalizedText,
      duration: 3000,
    })

    return true
  }

  const removeTask = (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId)
    if (!taskToDelete) return

    setTasks((prev) => prev.filter((task) => task.id !== taskId))

    toast.error("Tarefa removida", {
      description: taskToDelete.text,
      duration: 5000,
      action: {
        label: "Desfazer",
        onClick: () => {
          setTasks((prev) => [...prev, taskToDelete])
          toast.success("Tarefa restaurada! 🎉")
        },
      },
    })
  }

  const toggleTask = (taskId: string) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const editTask = (taskId: string, newText: string) => {
    const trimmedText = newText.trim()
    
    if (!trimmedText) return false
    
    const capitalizedText = trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1)
    
    setTasks((prev) => 
      prev.map((task) => 
        task.id === taskId ? { ...task, text: capitalizedText } : task
      )
    )

    toast.success("Tarefa editada com sucesso! ✏️", {
      description: capitalizedText,
      duration: 3000,
    })

    return true
  }

  return {
    tasks,
    isLoading,
    addTask,
    removeTask,
    toggleTask,
    editTask,
    isAtTaskLimit: tasks.length >= MAX_TASKS,
    taskCount: tasks.length,
    maxTasks: MAX_TASKS,
  }
}