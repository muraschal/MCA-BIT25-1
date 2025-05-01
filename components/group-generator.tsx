"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle, Users, Upload, Download, RefreshCw, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { GroupCard } from "./group-card"
import { ParticipantImport } from "./participant-import"
import { useToast } from "@/hooks/use-toast"
import { generateGroups, getGroupThemes } from "@/lib/group-utils"
import type { Participant, Group } from "@/types/groups"
import { initialParticipants } from "@/data/participants"
import { StudentChaos } from "./student-chaos"

// Lustige Taglines für unterhalb des Titels
const funnyTaglines = [
  "Forming, Storming, Norming, Performing... and occasional Chaos!",
  "Where 'Team Synergy' meets 'Who are these people?'",
  "Because random teams are better than your office politics",
  "Transforming 'Not another group project' into 'Dream Team'",
  "Making networking less awkward since 2025",
  "Like LinkedIn's algorithm, but with actual humans",
  "For when Rock-Paper-Scissors isn't professional enough",
  "Because Excel randomization just doesn't have the same pizzazz",
  "Turning strangers into colleagues since your coffee kicked in",
  "Your group work trauma ends here",
  "Breaking silos faster than your morning espresso",
  "Cultivating cross-functional excellence through glorified randomization",
  "Leveraging human capital with sophisticated clicking technology",
  "The AI revolution stops at team formation... for now",
  "Disrupting the 'same people always work together' paradigm",
  "Where introverts and extroverts unite (whether they want to or not)",
  "Creating tomorrow's leadership stories today",
  "Strategic randomization for optimal human resource allocation",
  "Driving innovation through unexpected collaboration",
  "Agile team formation without the buzzword bingo"
];

export function GroupGenerator() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants)
  const [groups, setGroups] = useState<Group[]>([])
  const [numGroups, setNumGroups] = useState<number>(6)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showChaos, setShowChaos] = useState(true)
  const [tagline, setTagline] = useState("")
  const { toast, Toaster } = useToast()
  const groupsContainerRef = useRef<HTMLDivElement>(null)

  // Zufällige Tagline beim Laden auswählen
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyTaglines.length);
    setTagline(funnyTaglines[randomIndex]);
  }, []);

  const handleGenerateGroups = async () => {
    setIsGenerating(true)
    
    // Hide the chaos animation
    setShowChaos(false)

    // Simulate processing time for animation effect
    await new Promise((resolve) => setTimeout(resolve, 800))

    const themes = getGroupThemes(numGroups)
    const newGroups = generateGroups(participants, numGroups, themes)
    setGroups([])

    // Small delay before showing new groups for animation effect
    setTimeout(() => {
      setGroups(newGroups)
      setIsGenerating(false)
      
      // Warte kurz bis die Gruppen gerendert sind und scrolle dann sanft dorthin
      setTimeout(() => {
        if (groupsContainerRef.current && window.innerWidth < 768) {
          groupsContainerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 400);
    }, 300)

    toast({
      title: "Teams Created!",
      description: `${numGroups} dynamic teams successfully generated.`,
    })
  }

  const handleImportParticipants = (newParticipants: Participant[]) => {
    setParticipants(newParticipants)
    setShowImport(false)
    toast({
      title: "Participants Imported",
      description: `${newParticipants.length} participants successfully onboarded.`,
    })
  }

  const resetGroups = () => {
    setGroups([])
    setShowChaos(true)
  }

  const exportGroups = () => {
    if (groups.length === 0) {
      toast({
        title: "No Teams Available",
        description: "Please generate teams first to proceed.",
        variant: "destructive",
      })
      return
    }

    const csv = [
      "Team,Name,Organization,Position",
      ...groups.flatMap((group) =>
        group.members.map((member) => `"${group.name}","${member.name}","${member.organization}","${member.position || 'Not specified'}"`),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "hwz-team-allocation.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export Successful",
      description: "Team allocation with positions exported as CSV file.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StudentChaos participants={participants} isVisible={showChaos} />
      
      {/* Simplified header ohne Menübutton */}
      <header className="flex justify-between items-center py-6 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
            HWZ Team Generator
          </h1>
        </motion.div>
      </header>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-left max-w-2xl mb-16 relative z-10"
      >
        <h2 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">Team Allocation Engine</h2>
        <p className="text-lg text-blue-600 italic mb-8">
          {tagline}
        </p>

        {/* Verbesserte mobile Ansicht für Kontrollelemente */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Card className="backdrop-blur-md bg-white/30 border-0 shadow-sm w-full sm:w-auto">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Number of Teams:</span>
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

          <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
            <Button
              onClick={handleGenerateGroups}
              disabled={isGenerating}
              className="gap-2 bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700 text-white rounded-full px-6 w-full sm:w-auto"
              size="lg"
            >
              {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Shuffle className="h-4 w-4" />}
              Generate Teams
            </Button>

            {groups.length > 0 && (
              <Button 
                variant="outline" 
                onClick={resetGroups} 
                className="gap-2 rounded-full border-blue-600 text-blue-700 w-full sm:w-auto" 
                size="lg"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showImport && <ParticipantImport onImport={handleImportParticipants} onCancel={() => setShowImport(false)} />}
      </AnimatePresence>

      <div 
        ref={groupsContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 relative z-10"
      >
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

      {/* Footer mit GitHub Link und Copyright */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 border-t border-gray-200 bg-white/90 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} - <a 
                href="https://www.linkedin.com/in/marcelrapold/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-700 underline"
              >
                Marcel Rapold
              </a>
            </div>
            <div className="flex items-center">
              <a 
                href="https://github.com/muraschal/MCA-BIT25-1" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-700"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" className="inline-block">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Source Code on GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Extra Platz für den fixierten Footer */}
      <div className="pb-20"></div>

      <Toaster />
    </div>
  )
}
