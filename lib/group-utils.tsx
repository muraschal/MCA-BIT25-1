import { Crown, Database, Lightbulb, Zap, Globe, Search, BarChart, Rocket, type LucideIcon } from "lucide-react"
import type { Participant, Group, GroupTheme } from "@/types/groups"

export function getGroupIcon(theme: GroupTheme): LucideIcon {
  const icons: Record<GroupTheme, LucideIcon> = {
    leadership: Crown,
    data: Database,
    innovation: Lightbulb,
    agility: Zap,
    digital: Globe,
    solution: Search,
    strategy: BarChart,
    future: Rocket,
  }

  return icons[theme]
}

export function getGroupColor(theme: GroupTheme) {
  const colors: Record<GroupTheme, { gradientFrom: string; gradientTo: string; iconColor: string }> = {
    leadership: {
      gradientFrom: "#FF0080",
      gradientTo: "#FF8C00",
      iconColor: "#FFFFFF",
    },
    data: {
      gradientFrom: "#7928CA",
      gradientTo: "#FF0080",
      iconColor: "#FFFFFF",
    },
    innovation: {
      gradientFrom: "#FF4D4D",
      gradientTo: "#F9CB28",
      iconColor: "#FFFFFF",
    },
    agility: {
      gradientFrom: "#FF0080",
      gradientTo: "#7928CA",
      iconColor: "#FFFFFF",
    },
    digital: {
      gradientFrom: "#0070F3",
      gradientTo: "#00DFD8",
      iconColor: "#FFFFFF",
    },
    solution: {
      gradientFrom: "#F9CB28",
      gradientTo: "#FF4D4D",
      iconColor: "#FFFFFF",
    },
    strategy: {
      gradientFrom: "#7928CA",
      gradientTo: "#0070F3",
      iconColor: "#FFFFFF",
    },
    future: {
      gradientFrom: "#00DFD8",
      gradientTo: "#7928CA",
      iconColor: "#FFFFFF",
    },
  }

  return colors[theme]
}

export function getGroupThemes(count: number): GroupTheme[] {
  const allThemes: GroupTheme[] = [
    "leadership",
    "data",
    "innovation",
    "agility",
    "digital",
    "solution",
    "strategy",
    "future",
  ]

  // Shuffle and take the first 'count' themes
  return shuffleArray(allThemes).slice(0, count)
}

export function getGroupName(theme: GroupTheme): string {
  const names: Record<GroupTheme, string> = {
    leadership: "Gruppe Leadership Legends",
    data: "Gruppe Data Dragons",
    innovation: "Gruppe Innovation Igniters",
    agility: "Gruppe Agility Artists",
    digital: "Gruppe Digital Dreamweavers",
    solution: "Gruppe Solution Seekers",
    strategy: "Gruppe Strategy Stars",
    future: "Gruppe Future Founders",
  }

  return names[theme]
}

export function generateGroups(participants: Participant[], numGroups: number, themes: GroupTheme[]): Group[] {
  // Create a copy and shuffle the participants
  const shuffledParticipants = shuffleArray([...participants])

  // Create empty groups
  const groups: Group[] = themes.slice(0, numGroups).map((theme, index) => ({
    id: `group-${index}`,
    name: getGroupName(theme),
    theme,
    members: [],
  }))

  // Distribute participants evenly
  shuffledParticipants.forEach((participant, index) => {
    const groupIndex = index % numGroups
    groups[groupIndex].members.push(participant)
  })

  return groups
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
