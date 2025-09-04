import type React from "react"
import { Task } from "../../types/task"
import { TaskItem } from "./TaskItem"

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (taskId: string) => void
  onRemoveTask: (taskId: string) => void
  onEditTask: (taskId: string, newText: string) => boolean
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onRemoveTask, onEditTask }) => {
  // Ordenar tarefas da mais recente para a mais antiga
  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  
  return (
    <div className="space-y-2">
      {sortedTasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onRemove={onRemoveTask}
          onEdit={onEditTask}
          index={index}
        />
      ))}
    </div>
  )
}