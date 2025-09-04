import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, CheckCircle2, Pencil, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Task } from "../../types/task"

interface TaskItemProps {
  task: Task
  onToggle: (taskId: string) => void
  onRemove: (taskId: string) => void
  onEdit: (taskId: string, newText: string) => boolean
  index: number
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onRemove, onEdit, index }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleEdit = () => {
    if (!task.completed) {
      setIsEditing(true)
      setEditText(task.text)
    }
  }

  const handleSave = () => {
    if (onEdit(task.id, editText)) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText(task.text)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <Card
      className="shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm transform hover:-translate-y-1 leading-5"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <CardContent className="px-3 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(task.id)}
            className={cn(
              "flex-shrink-0 w-5 h-5 rounded-full border-3 flex items-center justify-center transition-all duration-300 transform hover:scale-110",
              task.completed
                ? "bg-gradient-to-r from-blue-400 to-indigo-400 border-blue-400 text-white shadow-lg"
                : "border-blue-300 hover:border-blue-400 hover:bg-blue-50",
            )}
          >
            {task.completed && <CheckCircle2 className="h-3 w-3" />}
          </button>

          {isEditing ? (
            <>
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 border-2 border-blue-300 focus:border-blue-500 rounded-lg px-2 py-1 text-base"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2 h-8 w-8 rounded-full transition-all duration-200"
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-600 hover:bg-gray-50 p-2 h-8 w-8 rounded-full transition-all duration-200"
              >
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <>
              <span
                className={cn(
                  "flex-1 transition-all duration-300 text-base",
                  task.completed ? "text-blue-400 line-through opacity-60" : "text-blue-900 font-medium",
                )}
              >
                {task.text}
              </span>

              {!task.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-2 h-8 w-8 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(task.id)}
                className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 h-8 w-8 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}