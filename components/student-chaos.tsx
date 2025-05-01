"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import type { Participant } from "@/types/groups"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface StudentChaosProps {
  participants: Participant[]
  isVisible: boolean
  onAnimationComplete?: () => void
}

export function StudentChaos({ participants, isVisible, onAnimationComplete }: StudentChaosProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [randomPositions, setRandomPositions] = useState<{ x: number; y: number; z: number }[]>([])
  const mousePosition = useMousePosition()

  useEffect(() => {
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
        setContainerHeight(containerRef.current.offsetHeight)
      }
    }

    updateContainerDimensions()
    window.addEventListener("resize", updateContainerDimensions)

    return () => {
      window.removeEventListener("resize", updateContainerDimensions)
    }
  }, [])

  useEffect(() => {
    const generateRandomPositions = () => {
      const positions = participants.map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 10, // For z-index and scaling
      }))
      setRandomPositions(positions)
    }

    if (containerWidth > 0 && containerHeight > 0) {
      generateRandomPositions()
    }
  }, [participants, containerWidth, containerHeight])

  return (
    <AnimatePresence onExitComplete={() => onAnimationComplete?.()}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-10 pointer-events-none"
        >
          <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <h2 className="text-8xl font-bold text-gray-900">HWZ Gruppengenerator</h2>
            </div>

            {participants.map((participant, index) => {
              const randomX = randomPositions[index]?.x || 0
              const randomY = randomPositions[index]?.y || 0
              const randomZ = randomPositions[index]?.z || 0
              const randomScale = 0.7 + (randomZ / 10) * 0.8 // Scale based on z value
              const randomRotate = -15 + Math.random() * 30
              const randomDelay = Math.random() * 1.5
              const randomDuration = 2 + Math.random() * 3

              // Generate a random gradient for the glow effect
              const hue1 = Math.floor(Math.random() * 360)
              const hue2 = (hue1 + 30 + Math.floor(Math.random() * 60)) % 360
              const glowGradient = `linear-gradient(135deg, hsl(${hue1}, 100%, 70%), hsl(${hue2}, 100%, 70%))`

              // Warp effect variables for exit animation
              const exitX = (Math.random() - 0.5) * 5000
              const exitY = (Math.random() - 0.5) * 5000
              const exitScale = 5 + Math.random() * 10

              return (
                <motion.div
                  key={participant.id}
                  className="absolute"
                  style={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                    zIndex: Math.floor(randomZ),
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: randomRotate * 2 }}
                  animate={{
                    opacity: 1,
                    scale: randomScale,
                    rotate: randomRotate,
                    x: [0, 10, -5, 8, 0].map((v) => v * (1 + randomZ / 5)),
                    y: [0, -8, 5, -10, 0].map((v) => v * (1 + randomZ / 5)),
                    translateX: mousePosition.x * 0.003 * (randomZ / 5 - 0.5),
                    translateY: mousePosition.y * 0.003 * (randomZ / 5 - 0.5),
                  }}
                  exit={{
                    x: exitX,
                    y: exitY, 
                    scale: exitScale,
                    opacity: 0,
                    transition: { 
                      duration: 1.5 + Math.random(),
                      ease: [0.23, 1, 0.32, 1]
                    }
                  }}
                  transition={{
                    delay: randomDelay,
                    duration: randomDuration,
                    scale: { type: "spring", stiffness: 100 },
                    x: { repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", duration: 10 + Math.random() * 20 },
                    y: { repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", duration: 15 + Math.random() * 20 },
                    translateX: { type: "spring", stiffness: 50 },
                    translateY: { type: "spring", stiffness: 50 },
                  }}
                >
                  <motion.div
                    className="relative group"
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 blur-md -z-10"
                      style={{ background: glowGradient }}
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ 
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror"
                      }}
                    />

                    <div className="h-24 w-24 rounded-full border-2 border-white shadow-lg overflow-hidden">
                      <img 
                        src={`/student_${participant.id.replace('p', '')}.jpeg`}
                        alt={participant.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Name tooltip only shown on hover */}
                    <motion.div
                      className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg opacity-0 pointer-events-none whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {participant.name}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}

            {/* Decorative floating particles */}
            {Array.from({ length: 30 }).map((_, i) => {
              const size = 2 + Math.random() * 6
              const speed = 10 + Math.random() * 40
              const initialX = Math.random() * 100
              const initialY = Math.random() * 100
              
              // Warp effect for particles
              const exitX = (Math.random() - 0.5) * 4000
              const exitY = (Math.random() - 0.5) * 4000

              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30"
                  style={{
                    width: size,
                    height: size,
                    left: `${initialX}%`,
                    top: `${initialY}%`,
                    filter: "blur(1px)",
                  }}
                  animate={{
                    x: [0, 10, -10, 5, 0].map((v) => v * Math.random() * 5),
                    y: [0, -5, 10, -10, 0].map((v) => v * Math.random() * 5),
                  }}
                  exit={{
                    x: exitX,
                    y: exitY,
                    opacity: 0,
                    scale: 3,
                    transition: { 
                      duration: 1 + Math.random(),
                      ease: [0.23, 1, 0.32, 1]
                    }
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    duration: speed,
                  }}
                />
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 