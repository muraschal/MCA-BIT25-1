"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Participant } from "@/types/groups"

interface ParticipantImportProps {
  onImport: (participants: Participant[]) => void
  onCancel: () => void
}

export function ParticipantImport({ onImport, onCancel }: ParticipantImportProps) {
  const [csvData, setCsvData] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleImport = () => {
    try {
      setError(null)

      if (!csvData.trim()) {
        setError("Bitte geben Sie Daten ein.")
        return
      }

      const lines = csvData.trim().split("\n")
      const participants: Participant[] = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const [name, organization] = line.split(",").map((item) => item.trim())

        if (!name) {
          setError(`Zeile ${i + 1}: Name fehlt.`)
          return
        }

        participants.push({
          id: `p-${Date.now()}-${i}`,
          name,
          organization: organization || "",
        })
      }

      if (participants.length === 0) {
        setError("Keine gültigen Teilnehmer gefunden.")
        return
      }

      onImport(participants)
    } catch (err) {
      setError("Fehler beim Importieren. Bitte überprüfen Sie das Format.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
          <CardHeader className="relative">
            <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
            <CardTitle>Teilnehmer importieren</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Geben Sie die Teilnehmerdaten im Format "Name, Organisation" ein (ein Teilnehmer pro Zeile):
              </p>
              <Textarea
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                placeholder="Max Mustermann, Beispiel AG
Jane Doe, Muster GmbH"
                className="min-h-[200px] font-mono text-sm bg-white/50 backdrop-blur-sm"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel} className="rounded-full">
              Abbrechen
            </Button>
            <Button
              onClick={handleImport}
              className="gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Upload className="h-4 w-4" />
              Importieren
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
