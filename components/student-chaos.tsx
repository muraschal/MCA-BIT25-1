"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import type { Participant } from "@/types/groups"

interface StudentChaosProps {
  participants: Participant[]
  isVisible: boolean
  onAnimationComplete?: () => void
}

export function StudentChaos({ participants, isVisible, onAnimationComplete }: StudentChaosProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [randomPositions, setRandomPositions] = useState<{ x: number; y: number; z: number; scale: number; breathSpeed: number; breathIntensity: number }[]>([])

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

  // Einfache Positionierung erstellen
  useEffect(() => {
    if (containerWidth > 0 && containerHeight > 0) {
      // Einfache Avatarpositionierung mit unterschiedlichen Größen
      const positions = participants.map(() => ({
        x: 5 + Math.random() * 90, // Über den gesamten Bildschirm verteilt (mit leichtem Abstand vom Rand)
        y: 5 + Math.random() * 90, // Über den gesamten Bildschirm verteilt (mit leichtem Abstand vom Rand)
        z: Math.random() * 10,      // Leichte Z-Variation
        scale: 0.7 + Math.random() * 0.6, // Unterschiedliche Größen (70% bis 130%)
        breathSpeed: 2 + Math.random() * 4, // Atmungsgeschwindigkeit zwischen 2s und 6s
        breathIntensity: 0.05 + Math.random() * 0.1, // Atmungsintensität zwischen 5% und 15%
      }))
      
      setRandomPositions(positions)
    }
  }, [participants, containerWidth, containerHeight])

  return (
    <AnimatePresence onExitComplete={() => onAnimationComplete?.()}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-0 pointer-events-none"
        >
          <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* HWZ Logo als Wasserzeichen */}
              <div className="w-[600px] h-[350px] opacity-5">
                <img
                  src="/hwz-logo.svg"
                  alt="HWZ Logo"
                  className="w-full h-full"
                />
              </div>
            </div>

            {participants.map((participant, index) => {
              const randomX = randomPositions[index]?.x || 0
              const randomY = randomPositions[index]?.y || 0
              const randomZ = randomPositions[index]?.z || 0
              const photoScale = randomPositions[index]?.scale || 1
              const breathSpeed = randomPositions[index]?.breathSpeed || 3
              const breathIntensity = randomPositions[index]?.breathIntensity || 0.1
              const randomDelay = Math.random() * 0.5
              
              // Organischere Bewegungspfade mit Bézier-Kurven-ähnlichem Verhalten
              const xPath = [
                0,
                60 * (Math.random() > 0.5 ? 1 : -1), 
                -90 * (Math.random() > 0.5 ? 1 : -1), 
                40 * (Math.random() > 0.5 ? 1 : -1),
                -80 * (Math.random() > 0.5 ? 1 : -1),
                50 * (Math.random() > 0.5 ? 1 : -1),
                0
              ];
              
              const yPath = [
                0,
                -60 * (Math.random() > 0.5 ? 1 : -1),
                35 * (Math.random() > 0.5 ? 1 : -1),
                -75 * (Math.random() > 0.5 ? 1 : -1),
                80 * (Math.random() > 0.5 ? 1 : -1),
                -50 * (Math.random() > 0.5 ? 1 : -1),
                0
              ];

              // Atem-Animation Werte berechnen - leicht unterschiedlich für jedes Profil
              const baseScale = photoScale;
              const minScale = baseScale * (1 - breathIntensity);
              const maxScale = baseScale * (1 + breathIntensity);

              return (
                <motion.div
                  key={participant.id}
                  className="absolute"
                  style={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                    zIndex: Math.floor(randomZ),
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.5,
                    x: -20,
                    y: -20
                  }}
                  animate={{
                    opacity: 1,
                    // Die scale-Animation wird unten in der div mit dem Bild angewendet
                    // Individuelle, organische Bewegung
                    x: xPath,
                    y: yPath,
                    // Leichte Rotation für organischeres Gefühl
                    rotate: [-2, 1, -1, 2, 0].map(r => r * Math.random() * 2)
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    transition: { duration: 0.5 }
                  }}
                  transition={{
                    delay: randomDelay,
                    opacity: { duration: 0.8 },
                    rotate: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      duration: 8 + Math.random() * 12,
                      ease: "easeInOut"
                    },
                    x: { 
                      repeat: Number.POSITIVE_INFINITY, 
                      repeatType: "mirror", 
                      // Schnellere Bewegung
                      duration: 15 + Math.random() * 20,
                      // Ungleichmäßige Zeitverteilung für organischere Bewegung
                      times: [0, 0.14, 0.28, 0.47, 0.65, 0.83, 1],
                      ease: "easeInOut"
                    },
                    y: { 
                      repeat: Number.POSITIVE_INFINITY, 
                      repeatType: "mirror", 
                      // Schnellere Bewegung
                      duration: 18 + Math.random() * 22,
                      // Ungleichmäßige Zeitverteilung für organischere Bewegung
                      times: [0, 0.17, 0.34, 0.53, 0.72, 0.88, 1],
                      ease: "easeInOut"
                    }
                  }}
                >
                  {/* Äußere Div mit Farbverlauf und Glüheffekt - HWZ-Blau */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(32, 57, 157, 0.3), rgba(51, 102, 204, 0.3))",
                      width: `${370 * baseScale}px`,
                      height: `${370 * baseScale}px`,
                      transform: "translate(-50%, -50%)",
                      filter: "blur(8px)",
                    }}
                    animate={{
                      scale: [minScale, maxScale, minScale],
                      background: [
                        "linear-gradient(135deg, rgba(32, 57, 157, 0.2), rgba(51, 102, 204, 0.2))",
                        "linear-gradient(135deg, rgba(32, 57, 157, 0.4), rgba(51, 102, 204, 0.4))",
                        "linear-gradient(135deg, rgba(32, 57, 157, 0.2), rgba(51, 102, 204, 0.2))"
                      ]
                    }}
                    transition={{
                      scale: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: breathSpeed,
                        ease: "easeInOut"
                      },
                      background: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: breathSpeed,
                        ease: "easeInOut"
                      }
                    }}
                  />
                  
                  {/* Innere Div mit dem eigentlichen Bild */}
                  <motion.div 
                    className="rounded-full border-2 border-white shadow-lg overflow-hidden transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      // 50% größere Fotos - Basisgröße von 360px statt 240px
                      width: `${360 * baseScale}px`,
                      height: `${360 * baseScale}px`,
                      position: "relative", // Damit es über dem Glow-Effekt liegt
                      zIndex: 1
                    }}
                    animate={{
                      // Atmende Animation mit individuellen Parametern
                      scale: [minScale, maxScale, minScale],
                      boxShadow: [
                        "0 0 0 rgba(32, 57, 157, 0.2), 0 0 0 rgba(51, 102, 204, 0.2)",
                        "0 0 15px rgba(32, 57, 157, 0.4), 0 0 30px rgba(51, 102, 204, 0.4)",
                        "0 0 0 rgba(32, 57, 157, 0.2), 0 0 0 rgba(51, 102, 204, 0.2)"
                      ]
                    }}
                    transition={{
                      scale: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: breathSpeed,
                        ease: "easeInOut"
                      },
                      boxShadow: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: breathSpeed,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <img 
                      src={`/student_${participant.id.replace('p', '')}.jpeg`}
                      alt={participant.name}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 