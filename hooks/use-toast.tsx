"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type ToastVariant = "default" | "destructive"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string
    description?: string
    variant?: ToastVariant
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant }

    setToasts((prev) => [...prev, newToast])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const Toaster = () => {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`p-4 rounded-xl shadow-lg max-w-md backdrop-blur-lg ${
                t.variant === "destructive"
                  ? "bg-red-500/80 text-white border border-red-600/20"
                  : "bg-white/80 text-gray-800 border border-gray-200/20"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{t.title}</h3>
                <button onClick={() => dismiss(t.id)} className="text-sm opacity-70 hover:opacity-100">
                  ×
                </button>
              </div>
              {t.description && <p className="text-sm mt-1 opacity-90">{t.description}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  return { toast, dismiss, Toaster }
}
