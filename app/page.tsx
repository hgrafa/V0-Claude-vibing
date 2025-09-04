"use client"

import type React from "react"
import { useTasks } from "./hooks/useTasks"
import { Header } from "./components/todo/Header"
import { TaskInput } from "./components/todo/TaskInput"
import { TaskList } from "./components/todo/TaskList"
import { LoadingState } from "./components/todo/LoadingState"
import { Footer } from "./components/todo/Footer"

export default function TodoApp() {
  const { 
    tasks, 
    isLoading, 
    addTask, 
    removeTask, 
    toggleTask,
    editTask, 
    isAtTaskLimit, 
    taskCount, 
    maxTasks 
  } = useTasks()

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <Header />
        
        <TaskInput 
          onAddTask={addTask}
          isAtTaskLimit={isAtTaskLimit}
          taskCount={taskCount}
          maxTasks={maxTasks}
        />
        
        <TaskList 
          tasks={tasks}
          onToggleTask={toggleTask}
          onRemoveTask={removeTask}
          onEditTask={editTask}
        />
        
        <Footer />
      </div>
    </div>
  )
}