"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Group } from "@/types/groups"
import { getGroupIcon, getGroupColor } from "@/lib/group-utils"

interface GroupCardProps {
  group: Group
}

export function GroupCard({ group }: GroupCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = getGroupIcon(group.theme)
  const { gradientFrom, gradientTo, iconColor } = getGroupColor(group.theme)

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className="overflow-hidden border-0 shadow-lg backdrop-blur-lg"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}20, ${gradientTo}30)`,
          boxShadow: isHovered ? `0 20px 40px -10px ${gradientFrom}40` : `0 10px 30px -15px ${gradientFrom}30`,
        }}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div
              className="p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                color: iconColor,
              }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-bold">{group.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-white/40 backdrop-blur-md rounded-md overflow-hidden">
            {group.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-start gap-4 p-4 border-b last:border-b-0 border-gray-100 hover:bg-white/60 transition-colors"
              >
                <div className="flex-shrink-0 w-32 h-40 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <img
                    src={`/student_${member.id.replace('p', '')}.jpeg`}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="pt-3">
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-gray-500">{member.organization}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
