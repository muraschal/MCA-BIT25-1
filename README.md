# MCA-BIT25-1

## HWZ EMBA 2024 Gruppengenerator

Ein Tool zur zufälligen Gruppenerstellung für EMBA-Teilnehmer, entwickelt nach Google Engineering Style Best Practices.

## Projektstruktur
```
.
├── css/            # Stylesheets
├── data/           # CSV-Daten
├── images/         # Studentenbilder
├── js/             # JavaScript Code
├── index.html      # Hauptanwendung
└── README.md       # Dokumentation
```

## Features
- Lädt Teilnehmerdaten aus CSV
- Generiert zufällige Gruppen
- Zeigt Gruppen mit Emojis und Farben an
- Responsive Design für alle Bildschirmgrößen
- Moderne UI mit Bootstrap 5
- Clean Code nach Google Style Guide

## Installation
1. Repository klonen
2. Bilder in den `images`-Ordner kopieren
3. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
4. Lokalen Server starten:
   ```bash
   npm start
   ```
5. Im Browser öffnen: http://localhost:8080

## Entwicklung
- Lokaler Server läuft auf Port 8080
- Änderungen werden automatisch geladen
- Kein CORS-Problem beim Laden von CSV-Dateien

## Verwendung
1. Anzahl der gewünschten Gruppen auswählen
2. "Gruppen erstellen" Button klicken
3. Gruppen werden zufällig generiert und angezeigt

## Technische Details
- Vanilla JavaScript (ES6+)
- Bootstrap 5 für UI
- CSV-basierte Datenverwaltung
- Responsive Design
- Cross-Browser kompatibel

## Best Practices
- Clean Code Prinzipien
- Modulare Struktur
- Responsive Design
- Barrierefreiheit
- Performance optimiert
