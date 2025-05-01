# MCA-BIT25-1 – React Gruppengenerator

Ein moderner Gruppengenerator für die HWZ, komplett umgesetzt mit React, Next.js und Tailwind CSS.

## Features
- Zufällige Gruppenerstellung für Teilnehmer
- Import von Teilnehmerdaten aus CSV (`/data/list.csv`)
- Gruppendefinitionen aus CSV (`/data/groups.csv`)
- Profilbilder der Teilnehmer im Ordner `/public`
- Responsive, moderne UI mit Tailwind CSS
- State-of-the-Art React/Next.js Tech-Stack

## Projektstruktur
```
.
├── app/            # Next.js App Router
├── components/     # Wiederverwendbare React-Komponenten
├── data/           # CSV-Daten (list.csv, groups.csv)
├── public/         # Statische Assets (Profilbilder)
├── styles/         # Tailwind & globale Styles
├── ...             # Weitere Projektdateien
```

## Setup & Entwicklung
1. **Abhängigkeiten installieren**
   ```bash
   npm install
   # oder mit pnpm:
   pnpm install
   ```
2. **Lokalen Dev-Server starten**
   ```bash
   npm run dev
   # oder mit pnpm:
   pnpm dev
   ```
3. **App im Browser öffnen**
   - Standardmäßig unter: [http://localhost:3000](http://localhost:3000)

## Datenquellen
- Teilnehmer: `data/list.csv`
- Gruppen: `data/groups.csv`
- Profilbilder: `public/student_1.jpeg`, `public/student_2.jpeg`, ...

## Deployment
Das Projekt ist für Vercel, Netlify oder andere Next.js-kompatible Plattformen vorbereitet.

## Lizenz
MIT 