// Land parcel ownership record
export interface OwnershipRecord {
  owner: string
  from: string // ISO date string
  to: string | null // ISO date string or null if current owner
}

// Land parcel data structure
export interface LandParcel {
  id: number
  parcelId: string
  area: number // in square meters
  usage: string // e.g., Residential, Commercial, etc.
  zone: string // e.g., Zone A, Zone B, etc.
  status: string // e.g., Acquired, In Process, Disputed, For Sale
  lastSurvey: string // ISO date string
  coordinates?: [number, number][] // Array of [longitude, latitude] pairs
  center?: [number, number] // [longitude, latitude]
  ownershipHistory: OwnershipRecord[]
}

// Land transaction data structure
export interface LandTransaction {
  id: number
  parcelId: string
  type: string // e.g., Acquisition, Sale, Dispute, Listing
  date: string // ISO date string
  amount: number // in currency units
  fromParty: string
  toParty: string
  documents: string[] // Array of document references
  notes: string
}

