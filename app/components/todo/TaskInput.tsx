import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface TaskInputProps {
  onAddTask: (text: string) => boolean
  isAtTaskLimit: boolean
  taskCount: number
  maxTasks: number
}

export const TaskInput: React.FC<TaskInputProps> = ({ 
  onAddTask, 
  isAtTaskLimit, 
  taskCount, 
  maxTasks 
}) => {
  const [inputValue, setInputValue] = useState("")

  const handleAddTask = () => {
    if (onAddTask(inputValue)) {
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  const canAddTask = inputValue.trim() && !isAtTaskLimit

  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="O que precisa ser feito? ✨"
            className="flex-1 border-2 border-blue-200 focus:border-blue-400 rounded-xl text-lg py-3 px-4"
            disabled={isAtTaskLimit}
          />
          <Button
            onClick={handleAddTask}
            disabled={!canAddTask}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-600 font-medium">{taskCount}/{maxTasks} tarefas</span>
          </div>
          {isAtTaskLimit && (
            <span className="text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full">
              Limite atingido! 🎯
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}