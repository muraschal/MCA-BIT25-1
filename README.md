# HWZ Team Generator

Ein moderner Team-Allocations-Generator für die HWZ, entwickelt mit React, Next.js und Tailwind CSS.

## JavaScript-Funktionalitäten

```
┌─ App (Next.js)
│  ├─ GroupGenerator (Hauptkomponente)
│  │  ├─ useState Hooks
│  │  │  ├─ participants: Teilnehmerliste [Participant[]]
│  │  │  ├─ groups: Generierte Gruppen [Group[]]
│  │  │  ├─ numGroups: Anzahl zu erstellender Gruppen [number] 
│  │  │  ├─ isGenerating: Generierungsstatus [boolean]
│  │  │  ├─ showImport: Import-Dialog anzeigen [boolean]
│  │  │  ├─ showChaos: StudentChaos-Animation anzeigen [boolean]
│  │  │  └─ tagline: Zufälliger Business-Slogan [string]
│  │  │
│  │  ├─ Funktionen
│  │  │  ├─ handleGenerateGroups(): Erstellt zufällige Teams
│  │  │  │  └─ Ruft generateGroups() aus lib/group-utils auf
│  │  │  ├─ handleImportParticipants(): Verarbeitet importierte Teilnehmer
│  │  │  ├─ resetGroups(): Setzt Gruppen zurück, zeigt StudentChaos an
│  │  │  └─ exportGroups(): Exportiert Gruppen als CSV-Datei
│  │  │
│  │  └─ UI-Komponenten
│  │     ├─ StudentChaos: Animierte Profilbilder
│  │     ├─ GroupCard: Darstellung einzelner Teams
│  │     └─ ParticipantImport: Dialog zum Teilnehmerimport
│  │
│  ├─ StudentChaos (Animationskomponente)
│  │  ├─ useState und useEffect Hooks
│  │  │  ├─ containerWidth/Height: Größe des Containers [number]
│  │  │  └─ randomPositions: Zufällige Positionen der Avatare [Position[]]
│  │  │
│  │  └─ Funktionalität
│  │     ├─ Verteilung der Avatare über den ganzen Bildschirm
│  │     ├─ Individuelle Atmungs-Animation für jedes Profilbild
│  │     ├─ HWZ-blauer Glüheffekt um Profilbilder
│  │     └─ Z-Index-Verwaltung (Avatare hinter UI-Elementen)
│  │
│  └─ Hilfsfunktionen (lib/group-utils.ts)
│     ├─ generateGroups(): Erstellt Gruppen aus Teilnehmern
│     └─ getGroupThemes(): Liefert Gruppenthemen für Teams
│
└─ Design-System (Tailwind CSS)
   ├─ Farbpalette
   │  └─ HWZ-Blau: Primärfarbe (#20399D) mit Abstufungen
   │
   └─ Typografie
      ├─ Inter: Hauptschriftart für Text
      └─ Source Sans Pro: Schriftart für Überschriften
```

## Features
- Zufällige Teamgenerierung mit thematischen Gruppen
- Dynamische Avatar-Animationen im HWZ-Farbschema
- Interaktive Benutzeroberfläche mit professionellem Design
- Zufällige Business-Taglines für eine persönliche Note
- Benutzerprofilfotos mit organischen Animationen
- Responsive, moderne UI mit Tailwind CSS
- State-of-the-Art React/Next.js Tech-Stack

## Technische Implementierung
- **State Management**: React useState Hooks für lokalen Zustand
- **Animationen**: Framer Motion für flüssige Bewegungen und Übergänge
- **Styling**: Tailwind CSS mit HWZ-spezifischer Farbpalette und Typografie
- **UI-Komponenten**: Shadcn/UI als Basis für konsistente Benutzeroberfläche
- **Datenverarbeitung**: Funktionale Programmierung für Gruppengenerierung
- **Reaktivität**: useEffect Hooks für Container-Dimensionen und Positionsberechnung
- **Dateioperationen**: Browser-API für CSV-Export

## Visuelle Elemente
- Große Profilfotos (360px Basisgröße) mit Atmungsanimationseffekt
- Glüheffekt mit HWZ-Blau-Farbpalette
- Verteilte Avatare über den gesamten Bildschirm
- Korrekte Schichtung (Avatare hinter UI-Elementen)
- Zufällige witzige Business-Taglines bei jedem Seitenladen

## Projektstruktur
```
.
├── app/            # Next.js App Router
├── components/     # Wiederverwendbare React-Komponenten
├── data/           # Teilnehmerdaten
├── public/         # Statische Assets (Profilbilder, Logo)
├── styles/         # Tailwind & globale Stile
├── types/          # TypeScript-Typdefinitionen
├── hooks/          # Benutzerdefinierte React-Hooks
├── lib/            # Hilfsfunktionen
```

## Setup & Entwicklung
1. **Abhängigkeiten installieren**
   ```bash
   npm install
   # oder mit pnpm:
   pnpm install
   ```
2. **Lokalen Entwicklungsserver starten**
   ```bash
   npm run dev
   # oder mit pnpm:
   pnpm dev
   ```
3. **App im Browser öffnen**
   - Standard unter: [http://localhost:3000](http://localhost:3000)

## Schlüsselkomponenten
- `StudentChaos`: Behandelt die animierten Profilfotos mit Atmungs- und Glüheffekten
- `GroupGenerator`: Hauptanwendungscontroller 
- `GroupCard`: Zeigt generierte Teaminformationen an

## Datenquellen
- Profilbilder: `public/student_1.jpeg`, `public/student_2.jpeg`, usw.
- Anfängliche Teilnehmerdaten in `data/participants.ts`

## Anpassung
Die Anwendung verwendet die blaue Farbpalette der HWZ und enthält das HWZ-Logo als Wasserzeichen. Taglines, Animationen und visuelle Elemente können leicht in ihren jeweiligen Komponentendateien angepasst werden.

## Entwickelt von
Marcel Rapold - [LinkedIn-Profil](https://www.linkedin.com/in/marcelrapold/)

## Quellcode
[GitHub-Repository](https://github.com/muraschal/MCA-BIT25-1)

## Lizenz
MIT 