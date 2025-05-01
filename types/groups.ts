export interface Participant {
  id: string
  name: string
  organization: string
  position?: string  // Optional field for professional title/position
}

export interface Group {
  id: string
  name: string
  theme: GroupTheme
  members: Participant[]
}

export type GroupTheme =
  | "leadership"
  | "data"
  | "innovation"
  | "agility"
  | "digital"
  | "solution"
  | "strategy"
  | "future"
