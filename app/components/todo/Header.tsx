import type React from "react"
import { Sparkles } from "lucide-react"

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TenhoQueApp
        </h1>
        <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
      </div>
      <p className="text-blue-600 font-medium">Organize suas tarefas com estilo!</p>
    </div>
  )
}