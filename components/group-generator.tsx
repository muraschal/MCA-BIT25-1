"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle, Users, Upload, Download, RefreshCw, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GroupCard } from "@/components/group-card"
import { ParticipantImport } from "@/components/participant-import"
import { useToast } from "@/hooks/use-toast"
import { generateGroups, getGroupThemes } from "@/lib/group-utils"
import type { Participant, Group } from "@/types/groups"
import { initialParticipants } from "@/data/participants"

export function GroupGenerator() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants)
  const [groups, setGroups] = useState<Group[]>([])
  const [numGroups, setNumGroups] = useState<number>(6)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const { toast, Toaster } = useToast()

  const handleGenerateGroups = async () => {
    setIsGenerating(true)

    // Simulate processing time for animation effect
    await new Promise((resolve) => setTimeout(resolve, 800))

    const themes = getGroupThemes(numGroups)
    const newGroups = generateGroups(participants, numGroups, themes)
    setGroups([])

    // Small delay before showing new groups for animation effect
    setTimeout(() => {
      setGroups(newGroups)
      setIsGenerating(false)
    }, 300)

    toast({
      title: "Gruppen erstellt!",
      description: `${numGroups} Gruppen wurden erfolgreich generiert.`,
    })
  }

  const handleImportParticipants = (newParticipants: Participant[]) => {
    setParticipants(newParticipants)
    setShowImport(false)
    toast({
      title: "Teilnehmer importiert",
      description: `${newParticipants.length} Teilnehmer wurden erfolgreich importiert.`,
    })
  }

  const exportGroups = () => {
    if (groups.length === 0) {
      toast({
        title: "Keine Gruppen vorhanden",
        description: "Bitte generieren Sie zuerst Gruppen.",
        variant: "destructive",
      })
      return
    }

    const csv = [
      "Gruppe,Name,Organisation",
      ...groups.flatMap((group) =>
        group.members.map((member) => `"${group.name}","${member.name}","${member.organization}"`),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "hwz-emba-gruppen.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export erfolgreich",
      description: "Die Gruppen wurden als CSV-Datei exportiert.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Amboss-style header */}
      <header className="flex justify-between items-center py-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            HWZ EMBA 2024
          </h1>
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Über uns
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Kontakt
            </a>
          </nav>
          <Button className="rounded-full bg-black text-white hover:bg-gray-800">Anmelden</Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </header>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-left max-w-2xl mb-16"
      >
        <h2 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">Gruppengenerator</h2>
        <p className="text-xl text-gray-600 mb-8">
          Zufällige Gruppenerstellung für EMBA-Teilnehmer der Hochschule für Wirtschaft Zürich
        </p>

        <div className="flex flex-wrap gap-4">
          <Card className="backdrop-blur-md bg-white/30 border-0 shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Anzahl der Gruppen:</span>
              </div>
              <Select value={numGroups.toString()} onValueChange={(value) => setNumGroups(Number.parseInt(value))}>
                <SelectTrigger className="w-20 bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="6" />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Button
            onClick={handleGenerateGroups}
            disabled={isGenerating}
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6"
            size="lg"
          >
            {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Shuffle className="h-4 w-4" />}
            Gruppen erstellen
          </Button>

          <Button variant="outline" onClick={() => setShowImport(true)} className="gap-2 rounded-full" size="lg">
            <Upload className="h-4 w-4" />
            Import
          </Button>

          <Button variant="outline" onClick={exportGroups} className="gap-2 rounded-full" size="lg">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Geometric decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 opacity-20 pointer-events-none hidden lg:block">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FF0066"
              d="M47.7,-57.2C59.9,-45.8,67.2,-28.6,68.1,-11.5C69,5.7,63.5,22.8,53.1,35.8C42.7,48.8,27.4,57.6,10.2,62.1C-7,66.5,-26.2,66.6,-40.4,58.3C-54.6,50,-63.9,33.3,-67.4,15.1C-70.9,-3.1,-68.7,-22.8,-59.1,-37.4C-49.5,-52,-32.5,-61.5,-14.9,-63.9C2.8,-66.3,35.5,-68.5,47.7,-57.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {showImport && <ParticipantImport onImport={handleImportParticipants} onCancel={() => setShowImport(false)} />}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <AnimatePresence>
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              <GroupCard group={group} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Toaster />
    </div>
  )
}
