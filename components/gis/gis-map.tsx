"use client"

import { useEffect, useRef, useState } from "react"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import XYZ from "ol/source/XYZ"
import OSM from "ol/source/OSM"
import { fromLonLat, toLonLat } from "ol/proj"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"
import LineString from "ol/geom/LineString"
import Polygon from "ol/geom/Polygon"
import { Fill, Stroke, Style, Text } from "ol/style"
import { defaults as defaultControls, ScaleLine, FullScreen, ZoomSlider } from "ol/control"
import Overlay from "ol/Overlay"
import GeoJSON from "ol/format/GeoJSON"
import Draw from "ol/interaction/Draw"
import Modify from "ol/interaction/Modify"
import Snap from "ol/interaction/Snap"
import { getArea } from "ol/sphere"
import { unByKey } from "ol/Observable"
import "ol/ol.css"

// Import UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Import icons
import {
  FileText,
  Plus,
  MapIcon,
  Pencil,
  Eye,
  Search,
  ChevronRight,
  ChevronLeft,
  FileUp,
  FileDown,
  Maximize2,
  Minimize2,
} from "lucide-react"

// Define types for land records
interface OwnershipRecord {
  owner: string
  from: string // ISO date string
  to: string | null // ISO date string or null if current owner
}

interface LandParcel {
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
  massaviNumber?: string // Government massavi number
  massaviDate?: string // Date of massavi issuance
  governmentDepartment?: string // Issuing department
  landValue?: number // Estimated land value
}

interface LandTransaction {
  id: number
  parcelId: string
  type: string // e.g., Acquisition, Sale, Dispute, Listing
  date: string // ISO date string
  amount: number // in currency units
  fromParty: string
  toParty: string
  documents: string[] // Array of document references
  notes: string
  massaviReference?: string // Reference to government massavi
  procurementStage?: string // Current stage in procurement process
}

// Define the layers prop type
interface GisMapProps {
  layers?: {
    roads?: boolean
    greenAreas?: boolean
    buildings?: boolean
    utilities?: boolean
    amenities?: boolean
    emergency?: boolean
    landParcels?: boolean
    massavis?: boolean
  }
}

// Sample data
const sampleLandParcels: LandParcel[] = [
  {
    id: 1,
    parcelId: "LP-001",
    area: 1200,
    usage: "Residential",
    zone: "Zone A",
    status: "Acquired",
    lastSurvey: "2023-01-15",
    coordinates: [
      [77.209, 28.6139],
      [77.21, 28.6139],
      [77.21, 28.6149],
      [77.209, 28.6149],
    ],
    center: [77.2095, 28.6144],
    ownershipHistory: [{ owner: "Housing Society", from: "2023-02-01", to: null }],
    massaviNumber: "M-2023-001",
    massaviDate: "2023-01-01",
    governmentDepartment: "Land Revenue Department",
    landValue: 5000000,
  },
  {
    id: 2,
    parcelId: "LP-002",
    area: 1800,
    usage: "Commercial",
    zone: "Zone B",
    status: "In Process",
    lastSurvey: "2023-03-20",
    coordinates: [
      [77.211, 28.6159],
      [77.212, 28.6159],
      [77.212, 28.6169],
      [77.211, 28.6169],
    ],
    center: [77.2115, 28.6164],
    ownershipHistory: [],
    massaviNumber: "M-2023-002",
    massaviDate: "2023-02-15",
    governmentDepartment: "Urban Development Authority",
    landValue: 8000000,
  },
  {
    id: 3,
    parcelId: "LP-003",
    area: 900,
    usage: "Residential",
    zone: "Zone A",
    status: "Disputed",
    lastSurvey: "2022-12-01",
    coordinates: [
      [77.208, 28.6129],
      [77.209, 28.6129],
      [77.209, 28.6139],
      [77.208, 28.6139],
    ],
    center: [77.2085, 28.6134],
    ownershipHistory: [],
    landValue: 3500000,
  },
  {
    id: 4,
    parcelId: "LP-004",
    area: 1500,
    usage: "Recreational",
    zone: "Zone C",
    status: "For Sale",
    lastSurvey: "2023-05-10",
    coordinates: [
      [77.21, 28.6149],
      [77.211, 28.6149],
      [77.211, 28.6159],
      [77.21, 28.6159],
    ],
    center: [77.2105, 28.6154],
    ownershipHistory: [],
    landValue: 6000000,
  },
]

const sampleTransactions: LandTransaction[] = [
  {
    id: 1,
    parcelId: "LP-001",
    type: "Acquisition",
    date: "2023-02-01",
    amount: 4500000,
    fromParty: "Previous Owner",
    toParty: "Housing Society",
    documents: ["doc123.pdf", "deed456.docx"],
    notes: "Initial acquisition of the land parcel.",
    massaviReference: "M-2023-001",
    procurementStage: "Completed",
  },
  {
    id: 2,
    parcelId: "LP-002",
    type: "Listing",
    date: "2023-03-15",
    amount: 0,
    fromParty: "Real Estate Agency",
    toParty: "Potential Buyers",
    documents: ["listing789.pdf"],
    notes: "Land parcel listed for sale.",
    massaviReference: "M-2023-002",
    procurementStage: "Initial",
  },
  {
    id: 3,
    parcelId: "LP-003",
    type: "Dispute",
    date: "2023-04-10",
    amount: 0,
    fromParty: "Neighboring Landowner",
    toParty: "Current Owner",
    documents: ["complaint.pdf", "evidence.docx"],
    notes: "Dispute over land boundaries.",
    procurementStage: "Legal Review",
  },
  {
    id: 4,
    parcelId: "LP-004",
    type: "Sale",
    date: "2023-06-01",
    amount: 5800000,
    fromParty: "Previous Owner",
    toParty: "New Investor",
    documents: ["sale_agreement.pdf", "transfer_deed.docx"],
    notes: "Land parcel sold to a new investor.",
    procurementStage: "Completed",
  },
]

const governmentMassavis = [
  {
    id: 1,
    massaviNumber: "M-2023-001",
    issueDate: "2023-01-01",
    issuingDepartment: "Land Revenue Department",
    area: 1200,
    estimatedValue: 5000000,
    center: [77.2095, 28.6144],
  },
  {
    id: 2,
    massaviNumber: "M-2023-002",
    issueDate: "2023-02-15",
    issuingDepartment: "Urban Development Authority",
    area: 1800,
    estimatedValue: 8000000,
    center: [77.2115, 28.6164],
  },
  {
    id: 3,
    massaviNumber: "M-2023-003",
    issueDate: "2023-03-10",
    issuingDepartment: "Forest Department",
    area: 3000,
    estimatedValue: 2500000,
    center: [77.207, 28.611],
  },
  {
    id: 4,
    massaviNumber: "M-2023-004",
    issueDate: "2023-04-01",
    issuingDepartment: "Irrigation Department",
    area: 800,
    estimatedValue: 1800000,
    center: [77.213, 28.617],
  },
]

// Fix the addRoads function
const addRoads = (source: VectorSource) => {
  // Sample road data (replace with your actual data)
  const roads = [
    {
      coordinates: [
        [77.208, 28.613],
        [77.21, 28.615],
      ],
    },
    {
      coordinates: [
        [77.211, 28.616],
        [77.213, 28.618],
      ],
    },
  ]

  roads.forEach((road) => {
    // Convert each coordinate to OpenLayers projection
    const projectedCoords = road.coordinates.map((coord) => fromLonLat(coord))
    // Create a LineString with the projected coordinates
    const line = new LineString(projectedCoords)
    const feature = new Feature({ geometry: line })
    source.addFeature(feature)
  })
}

// Fix the addGreenAreas function
const addGreenAreas = (source: VectorSource) => {
  // Sample green area data (replace with your actual data)
  const greenAreas = [
    {
      coordinates: [
        [77.207, 28.61],
        [77.208, 28.612],
        [77.209, 28.611],
      ],
    },
    {
      coordinates: [
        [77.212, 28.617],
        [77.213, 28.619],
        [77.214, 28.618],
      ],
    },
  ]

  greenAreas.forEach((area) => {
    // Convert each coordinate to OpenLayers projection
    const projectedCoords = area.coordinates.map((coord) => fromLonLat(coord))
    // Create a Polygon with the projected coordinates
    const polygon = new Polygon([projectedCoords])
    const feature = new Feature({ geometry: polygon })
    source.addFeature(feature)
  })
}

// Fix the addBuildings function
const addBuildings = (source: VectorSource) => {
  // Sample building data (replace with your actual data)
  const buildings = [
    {
      coordinates: [
        [77.208, 28.614],
        [77.209, 28.615],
        [77.21, 28.614],
        [77.209, 28.613],
      ],
    },
    {
      coordinates: [
        [77.211, 28.617],
        [77.212, 28.618],
        [77.213, 28.617],
        [77.212, 28.616],
      ],
    },
  ]

  buildings.forEach((building) => {
    // Convert each coordinate to OpenLayers projection
    const projectedCoords = building.coordinates.map((coord) => fromLonLat(coord))
    // Create a Polygon with the projected coordinates
    const polygon = new Polygon([projectedCoords])
    const feature = new Feature({ geometry: polygon })
    source.addFeature(feature)
  })
}

// Fix the addUtilities function
const addUtilities = (source: VectorSource) => {
  // Sample utility data (replace with your actual data)
  const utilities = [
    { coordinates: [77.2085, 28.6135], type: "water" },
    { coordinates: [77.2115, 28.6165], type: "electricity" },
  ]

  utilities.forEach((utility) => {
    // Convert the coordinate to OpenLayers projection
    const point = new Point(fromLonLat(utility.coordinates))
    const feature = new Feature({ geometry: point, type: utility.type })
    source.addFeature(feature)
  })
}

// Fix the addAmenities function
const addAmenities = (source: VectorSource) => {
  // Sample amenity data (replace with your actual data)
  const amenities = [
    { coordinates: [77.209, 28.614], name: "Park" },
    { coordinates: [77.212, 28.617], name: "School" },
  ]

  amenities.forEach((amenity) => {
    // Convert the coordinate to OpenLayers projection
    const point = new Point(fromLonLat(amenity.coordinates))
    const feature = new Feature({ geometry: point, name: amenity.name })
    source.addFeature(feature)
  })
}

// Fix the addEmergencyPoints function
const addEmergencyPoints = (source: VectorSource) => {
  // Sample emergency point data (replace with your actual data)
  const emergencyPoints = [
    { coordinates: [77.2095, 28.6145], type: "Hospital" },
    { coordinates: [77.2125, 28.6175], type: "Fire Station" },
  ]

  emergencyPoints.forEach((point) => {
    // Convert the coordinate to OpenLayers projection
    const olPoint = new Point(fromLonLat(point.coordinates))
    const feature = new Feature({ geometry: olPoint, type: point.type })
    source.addFeature(feature)
  })
}

const addLandParcels = (source: VectorSource, landParcels: LandParcel[]) => {
  landParcels.forEach((parcel) => {
    if (parcel.coordinates) {
      // Create an array of coordinate pairs properly converted to OpenLayers format
      const projectedCoords = parcel.coordinates.map((coord) => fromLonLat(coord))

      // Create a polygon with the projected coordinates
      const polygon = new Polygon([projectedCoords])
      const feature = new Feature({ geometry: polygon })

      // Set properties
      feature.setProperties({
        parcelId: parcel.parcelId,
        status: parcel.status,
        area: parcel.area,
        usage: parcel.usage,
        zone: parcel.zone,
        massaviNumber: parcel.massaviNumber,
      })

      source.addFeature(feature)
    }
  })
}

const addMassavis = (source: VectorSource, massavis: any[]) => {
  massavis.forEach((massavi) => {
    if (massavi.center) {
      const center = fromLonLat(massavi.center)
      const size = 0.001 // Approximately 100m at the equator

      // Create a square around the center point
      const coords = [
        [center[0] - size, center[1] - size],
        [center[0] + size, center[1] - size],
        [center[0] + size, center[1] + size],
        [center[0] - size, center[1] + size],
        [center[0] - size, center[1] - size], // Close the polygon
      ]

      const polygon = new Polygon([coords])
      const feature = new Feature({ geometry: polygon })

      // Set properties
      feature.setProperties({
        massaviNumber: massavi.massaviNumber,
        issueDate: massavi.issueDate,
        issuingDepartment: massavi.issuingDepartment,
        area: massavi.area,
        estimatedValue: massavi.estimatedValue,
      })

      source.addFeature(feature)
    }
  })
}

export default function GisMap({ layers = {} }: GisMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [layerSources, setLayerSources] = useState<{ [key: string]: VectorSource }>({})
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null)
  const [showLandRecordPanel, setShowLandRecordPanel] = useState(true)
  const [expandedPanel, setExpandedPanel] = useState(false)
  const [drawMode, setDrawMode] = useState<string | null>(null)
  const [landParcels, setLandParcels] = useState<LandParcel[]>(sampleLandParcels)
  const [landTransactions, setLandTransactions] = useState<LandTransaction[]>(sampleTransactions)
  const [activeTab, setActiveTab] = useState("parcels")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddParcelDialog, setShowAddParcelDialog] = useState(false)
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false)
  const [showMassaviDialog, setShowMassaviDialog] = useState(false)
  const [selectedMassavi, setSelectedMassavi] = useState<any>(null)
  const [newParcel, setNewParcel] = useState<Partial<LandParcel>>({
    parcelId: `LP-${String(landParcels.length + 1).padStart(3, "0")}`,
    area: 0,
    usage: "Residential",
    zone: "Zone A",
    status: "In Process",
    lastSurvey: new Date().toISOString().split("T")[0],
    massaviNumber: "",
    massaviDate: "",
    governmentDepartment: "",
    landValue: 0,
  })
  const [newTransaction, setNewTransaction] = useState<Partial<LandTransaction>>({
    parcelId: "",
    type: "Acquisition",
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    fromParty: "",
    toParty: "",
    documents: [],
    notes: "",
    massaviReference: "",
    procurementStage: "Initial",
  })

  // Filter parcels based on search query and status
  const filteredParcels = landParcels.filter(
    (parcel) =>
      (filterStatus === "all" || parcel.status === filterStatus) &&
      (searchQuery === "" ||
        parcel.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.usage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (parcel.massaviNumber && parcel.massaviNumber.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return

    // Ensure we don't create multiple maps
    if (map) return

    console.log("Initializing OpenLayers map...")

    // Create vector sources for each layer
    const roadSource = new VectorSource()
    const greenAreaSource = new VectorSource()
    const buildingSource = new VectorSource()
    const utilitySource = new VectorSource()
    const amenitySource = new VectorSource()
    const emergencySource = new VectorSource()
    const landParcelSource = new VectorSource()
    const massaviSource = new VectorSource()

    // Store sources for later access
    setLayerSources({
      roads: roadSource,
      greenAreas: greenAreaSource,
      buildings: buildingSource,
      utilities: utilitySource,
      amenities: amenitySource,
      emergency: emergencySource,
      landParcels: landParcelSource,
      massavis: massaviSource,
    })

    // Create vector layers
    const roadLayer = new VectorLayer({
      source: roadSource,
      visible: !!layers.roads,
    })

    const greenAreaLayer = new VectorLayer({
      source: greenAreaSource,
      visible: !!layers.greenAreas,
    })

    const buildingLayer = new VectorLayer({
      source: buildingSource,
      visible: !!layers.buildings,
    })

    const utilityLayer = new VectorLayer({
      source: utilitySource,
      visible: !!layers.utilities,
    })

    const amenityLayer = new VectorLayer({
      source: amenitySource,
      visible: !!layers.amenities,
    })

    const emergencyLayer = new VectorLayer({
      source: emergencySource,
      visible: !!layers.emergency,
    })

    const landParcelLayer = new VectorLayer({
      source: landParcelSource,
      visible: true,
      style: (feature) => {
        const parcelId = feature.get("parcelId")
        const status = feature.get("status")

        let fillColor = "rgba(255, 255, 255, 0.4)"
        let strokeColor = "#000000"

        // Color based on status
        if (status === "Acquired") {
          fillColor = "rgba(74, 222, 128, 0.4)" // Green
          strokeColor = "#16a34a"
        } else if (status === "In Process") {
          fillColor = "rgba(250, 204, 21, 0.4)" // Yellow
          strokeColor = "#ca8a04"
        } else if (status === "Disputed") {
          fillColor = "rgba(248, 113, 113, 0.4)" // Red
          strokeColor = "#dc2626"
        } else if (status === "For Sale") {
          fillColor = "rgba(96, 165, 250, 0.4)" // Blue
          strokeColor = "#2563eb"
        }

        return new Style({
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: strokeColor,
            width: 2,
          }),
          text: new Text({
            text: parcelId,
            font: "12px Arial",
            fill: new Fill({
              color: "#000000",
            }),
            stroke: new Stroke({
              color: "#ffffff",
              width: 3,
            }),
          }),
        })
      },
    })

    // Create massavi layer with special styling
    const massaviLayer = new VectorLayer({
      source: massaviSource,
      visible: true,
      style: (feature) => {
        const massaviNumber = feature.get("massaviNumber")

        return new Style({
          fill: new Fill({
            color: "rgba(147, 51, 234, 0.2)", // Purple with transparency
          }),
          stroke: new Stroke({
            color: "#7e22ce", // Purple
            width: 2,
            lineDash: [5, 5], // Dashed line
          }),
          text: new Text({
            text: `Massavi: ${massaviNumber}`,
            font: "12px Arial",
            fill: new Fill({
              color: "#7e22ce",
            }),
            stroke: new Stroke({
              color: "#ffffff",
              width: 3,
            }),
            offsetY: -15,
          }),
        })
      },
    })

    // Create base layers
    // Use OSM as fallback if Google tiles don't load
    const osmLayer = new TileLayer({
      source: new OSM(),
      visible: false,
    })

    // Create satellite base layer
    const satelliteLayer = new TileLayer({
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        attributions: "© Google Maps",
      }),
      visible: true,
    })

    // Create popup overlay
    const popup = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10],
    })

    // Create map instance with default controls
    const mapInstance = new Map({
      target: mapRef.current,
      layers: [
        osmLayer,
        satelliteLayer,
        roadLayer,
        greenAreaLayer,
        buildingLayer,
        utilityLayer,
        amenityLayer,
        emergencyLayer,
        landParcelLayer,
        massaviLayer,
      ],
      view: new View({
        center: fromLonLat([77.209, 28.6139]), // Convert to OpenLayers projection
        zoom: 17,
        maxZoom: 20,
      }),
      controls: defaultControls().extend([new ScaleLine(), new FullScreen(), new ZoomSlider()]),
      overlays: [popup],
    })

    // Add click handler for features
    mapInstance.on("click", (evt) => {
      const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, (feature) => feature)

      if (feature) {
        // Check if it's a land parcel
        if (feature.get("parcelId")) {
          const parcelId = feature.get("parcelId")
          const parcel = landParcels.find((p) => p.parcelId === parcelId)

          if (parcel) {
            setSelectedParcel(parcel)
            setShowLandRecordPanel(true)

            // Position popup
            const coordinates = feature.getGeometry().getCoordinates()
            if (coordinates && coordinates[0] && coordinates[0][0]) {
              popup.setPosition(coordinates[0][0])
            }
          }
        }
        // Check if it's a massavi
        else if (feature.get("massaviNumber")) {
          const massaviNumber = feature.get("massaviNumber")
          const massavi = governmentMassavis.find((m) => m.massaviNumber === massaviNumber)

          if (massavi) {
            setSelectedMassavi(massavi)
            setShowMassaviDialog(true)

            // Position popup
            const coordinates = feature.getGeometry().getCoordinates()
            if (coordinates && coordinates[0] && coordinates[0][0]) {
              popup.setPosition(coordinates[0][0])
            }
          }
        }
      } else {
        // Close popup if clicking outside features
        popup.setPosition(undefined)
      }
    })

    console.log("Map instance created:", mapInstance)

    // Store map instance
    setMap(mapInstance)

    // Add sample data to each layer
    setTimeout(() => {
      try {
        if (layers.roads) addRoads(roadSource)
        if (layers.greenAreas) addGreenAreas(greenAreaSource)
        if (layers.buildings) addBuildings(buildingSource)
        if (layers.utilities) addUtilities(utilitySource)
        if (layers.amenities) addAmenities(amenitySource)
        if (layers.emergency) addEmergencyPoints(emergencySource)

        // Always add land parcels and massavis
        addLandParcels(landParcelSource, landParcels)
        addMassavis(massaviSource, governmentMassavis)

        console.log("Map features added")
      } catch (error) {
        console.error("Error adding map features:", error)
      }
    }, 500)

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up map...")
      if (mapInstance) {
        mapInstance.setTarget(undefined)
      }
    }
  }, []) // Only run once on mount

  // Update layer visibility when props change
  useEffect(() => {
    if (!map) return

    console.log("Updating layer visibility:", layers)

    // Update layer visibility
    map.getLayers().forEach((layer, index) => {
      if (index <= 1) return // Skip base layers (OSM and satellite)

      const layerKeys = Object.keys(layers)
      if (index - 2 < layerKeys.length) {
        const key = layerKeys[index - 2]
        layer.setVisible(!!layers[key as keyof typeof layers])
      }
    })
  }, [map, layers])

  // Handle draw mode changes
  useEffect(() => {
    if (!map || !drawMode) return

    const source = layerSources.landParcels
    if (!source) return

    let draw: Draw | null = null
    let modify: Modify | null = null
    let snap: Snap | null = null
    let listener: any = null

    if (drawMode === "polygon") {
      // Create draw interaction
      draw = new Draw({
        source: source,
        type: "Polygon",
      })

      // Add properties to the drawn feature
      draw.on("drawend", (event) => {
        const feature = event.feature
        const geometry = feature.getGeometry() as Polygon
        const center = geometry.getInteriorPoint().getCoordinates()
        const lonLat = toLonLat(center)

        // Generate a new parcel ID
        const newParcelId = `LP-${String(landParcels.length + 1).padStart(3, "0")}`

        // Set properties
        feature.setProperties({
          parcelId: newParcelId,
          status: "In Process",
          area: Math.round(getArea(geometry)),
          center: lonLat,
        })

        // Create a new land parcel record
        const newParcel: LandParcel = {
          id: landParcels.length + 1,
          parcelId: newParcelId,
          area: Math.round(getArea(geometry)),
          usage: "Undetermined",
          zone: "Unzoned",
          status: "In Process",
          lastSurvey: new Date().toISOString().split("T")[0],
          coordinates: geometry.getCoordinates()[0].map((coord) => toLonLat(coord)),
          center: lonLat,
          ownershipHistory: [],
        }

        // Add to state
        setLandParcels((prev) => [...prev, newParcel])

        // Select the newly created parcel
        setSelectedParcel(newParcel)
        setShowLandRecordPanel(true)

        // Reset draw mode
        setDrawMode(null)
      })

      map.addInteraction(draw)
    } else if (drawMode === "modify") {
      // Create modify interaction for existing features
      modify = new Modify({
        source: source,
      })

      // Add snap interaction to help with editing
      snap = new Snap({
        source: source,
      })

      // Listen for modify end event
      listener = modify.on("modifyend", (event) => {
        // Update the modified features
        event.features.forEach((feature) => {
          const parcelId = feature.get("parcelId")
          const geometry = feature.getGeometry() as Polygon
          const area = Math.round(getArea(geometry))
          const coordinates = geometry.getCoordinates()[0].map((coord) => toLonLat(coord))
          const center = toLonLat(geometry.getInteriorPoint().getCoordinates())

          // Update the land parcel in state
          setLandParcels((prev) =>
            prev.map((parcel) =>
              parcel.parcelId === parcelId
                ? {
                    ...parcel,
                    area,
                    coordinates,
                    center,
                  }
                : parcel,
            ),
          )
        })
      })

      map.addInteraction(modify)
      map.addInteraction(snap)
    }

    // Cleanup
    return () => {
      if (draw) {
        map.removeInteraction(draw)
      }
      if (modify) {
        map.removeInteraction(modify)
        unByKey(listener)
      }
      if (snap) {
        map.removeInteraction(snap)
      }
    }
  }, [map, drawMode, layerSources, landParcels])

  // Add a new land parcel
  const addLandParcel = () => {
    const newParcelRecord: LandParcel = {
      id: landParcels.length + 1,
      parcelId: newParcel.parcelId || `LP-${String(landParcels.length + 1).padStart(3, "0")}`,
      area: newParcel.area || 0,
      usage: newParcel.usage || "Residential",
      zone: newParcel.zone || "Zone A",
      status: newParcel.status || "In Process",
      lastSurvey: newParcel.lastSurvey || new Date().toISOString().split("T")[0],
      center: newParcel.center || [77.209, 28.6139],
      ownershipHistory: [],
      massaviNumber: newParcel.massaviNumber,
      massaviDate: newParcel.massaviDate,
      governmentDepartment: newParcel.governmentDepartment,
      landValue: newParcel.landValue,
    }

    setLandParcels((prev) => [...prev, newParcelRecord])
    setShowAddParcelDialog(false)

    // If we have a massavi reference, create a rectangle around the center point
    if (newParcelRecord.center && layerSources.landParcels) {
      const center = fromLonLat(newParcelRecord.center)
      const size = 0.001 // Approximately 100m at the equator

      const coords = [
        [center[0] - size / 2, center[1] - size / 2],
        [center[0] + size / 2, center[1] - size / 2],
        [center[0] + size / 2, center[1] + size / 2],
        [center[0] - size / 2, center[1] + size / 2],
        [center[0] - size / 2, center[1] - size / 2], // Close the polygon
      ]

      const feature = new Feature({
        geometry: new Polygon([coords]),
      })

      // Set properties
      feature.setProperties({
        parcelId: newParcelRecord.parcelId,
        status: newParcelRecord.status,
        area: newParcelRecord.area,
        usage: newParcelRecord.usage,
        zone: newParcelRecord.zone,
        massaviNumber: newParcelRecord.massaviNumber,
      })

      layerSources.landParcels.addFeature(feature)
    }

    // Reset form
    setNewParcel({
      parcelId: `LP-${String(landParcels.length + 2).padStart(3, "0")}`,
      area: 0,
      usage: "Residential",
      zone: "Zone A",
      status: "In Process",
      lastSurvey: new Date().toISOString().split("T")[0],
      massaviNumber: "",
      massaviDate: "",
      governmentDepartment: "",
      landValue: 0,
    })
  }

  // Add a new land transaction
  const addLandTransaction = () => {
    if (!newTransaction.parcelId) return

    const newTransactionRecord: LandTransaction = {
      id: landTransactions.length + 1,
      parcelId: newTransaction.parcelId,
      type: newTransaction.type || "Acquisition",
      date: newTransaction.date || new Date().toISOString().split("T")[0],
      amount: newTransaction.amount || 0,
      fromParty: newTransaction.fromParty || "",
      toParty: newTransaction.toParty || "",
      documents: newTransaction.documents || [],
      notes: newTransaction.notes || "",
      massaviReference: newTransaction.massaviReference,
      procurementStage: newTransaction.procurementStage,
    }

    setLandTransactions((prev) => [...prev, newTransactionRecord])

    // Update parcel status if it's an acquisition
    if (newTransaction.type === "Acquisition") {
      setLandParcels((prev) =>
        prev.map((parcel) =>
          parcel.parcelId === newTransaction.parcelId
            ? {
                ...parcel,
                status: "Acquired",
                ownershipHistory: [
                  ...parcel.ownershipHistory,
                  {
                    owner: newTransaction.toParty || "Housing Society",
                    from: newTransaction.date || new Date().toISOString().split("T")[0],
                    to: null,
                  },
                ],
              }
            : parcel,
        ),
      )

      // Update the feature style in the map
      if (layerSources.landParcels) {
        const features = layerSources.landParcels.getFeatures()
        features.forEach((feature) => {
          if (feature.get("parcelId") === newTransaction.parcelId) {
            feature.set("status", "Acquired")
          }
        })
      }
    }

    setShowAddTransactionDialog(false)

    // Reset form
    setNewTransaction({
      parcelId: "",
      type: "Acquisition",
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      fromParty: "",
      toParty: "",
      documents: [],
      notes: "",
      massaviReference: "",
      procurementStage: "Initial",
    })
  }

  // Import massavi data
  const importMassavi = (massavi: any) => {
    if (!massavi || !layerSources.massavis) return

    // Create a new land parcel based on massavi data
    setNewParcel({
      parcelId: `LP-${String(landParcels.length + 1).padStart(3, "0")}`,
      area: massavi.area,
      usage: "Undetermined",
      zone: "Unzoned",
      status: "In Process",
      lastSurvey: new Date().toISOString().split("T")[0],
      center: massavi.center,
      massaviNumber: massavi.massaviNumber,
      massaviDate: massavi.issueDate,
      governmentDepartment: massavi.issuingDepartment,
      landValue: massavi.estimatedValue,
    })

    setShowAddParcelDialog(true)
    setShowMassaviDialog(false)
  }

  // Export land parcels as GeoJSON
  const exportLandParcels = () => {
    if (!layerSources.landParcels) return

    // Get all features from the land parcels layer
    const features = layerSources.landParcels.getFeatures()

    // Create GeoJSON from features
    const geoJson = new GeoJSON().writeFeaturesObject(features)

    // Add additional properties from our state
    geoJson.features.forEach((feature) => {
      const parcelId = feature.properties?.parcelId
      if (parcelId) {
        const parcel = landParcels.find((p) => p.parcelId === parcelId)
        if (parcel) {
          feature.properties = {
            ...feature.properties,
            ownershipHistory: parcel.ownershipHistory,
            massaviNumber: parcel.massaviNumber,
            massaviDate: parcel.massaviDate,
            governmentDepartment: parcel.governmentDepartment,
            landValue: parcel.landValue,
          }
        }
      }
    })

    // Create download link
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoJson))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "land_parcels.geojson")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // Generate a land procurement report
  const generateProcurementReport = () => {
    // Get all acquired parcels
    const acquiredParcels = landParcels.filter((p) => p.status === "Acquired")

    // Get all acquisition transactions
    const acquisitionTransactions = landTransactions.filter((t) => t.type === "Acquisition")

    // Calculate total area and cost
    const totalArea = acquiredParcels.reduce((sum, p) => sum + p.area, 0)
    const totalCost = acquisitionTransactions.reduce((sum, t) => sum + t.amount, 0)

    // Create report data
    const reportData = {
      totalParcels: acquiredParcels.length,
      totalArea,
      totalCost,
      averageCostPerSqm: totalArea > 0 ? totalCost / totalArea : 0,
      parcels: acquiredParcels.map((p) => ({
        parcelId: p.parcelId,
        area: p.area,
        massaviNumber: p.massaviNumber,
        transactions: acquisitionTransactions
          .filter((t) => t.parcelId === p.parcelId)
          .map((t) => ({
            date: t.date,
            amount: t.amount,
            fromParty: t.fromParty,
            toParty: t.toParty,
          })),
      })),
    }

    // Create download link
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "land_procurement_report.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // Zoom to a specific parcel
  const zoomToParcel = (parcel: LandParcel) => {
    if (!map || !parcel.center) return

    map.getView().animate({
      center: fromLonLat(parcel.center),
      zoom: 18,
      duration: 1000,
    })

    // Select the parcel
    setSelectedParcel(parcel)
    setShowLandRecordPanel(true)
  }

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full z-0"
        style={{
          minHeight: "500px",
          border: "1px solid #ccc",
        }}
      />

      {/* Popup Overlay */}
      <div ref={popupRef} className="absolute bg-white p-2 rounded shadow-md z-[2000] hidden">
        {selectedParcel && (
          <div className="text-sm">
            <div className="font-bold">{selectedParcel.parcelId}</div>
            <div>Area: {selectedParcel.area.toLocaleString()} sq.m</div>
            <div>Status: {selectedParcel.status}</div>
            {selectedParcel.massaviNumber && <div>Massavi: {selectedParcel.massaviNumber}</div>}
            <button
              className="mt-1 bg-primary text-white px-2 py-1 rounded text-xs"
              onClick={() => setShowLandRecordPanel(true)}
            >
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Land Record Side Panel */}
      {showLandRecordPanel && (
        <div
          className={`absolute top-0 ${expandedPanel ? "w-[500px]" : "w-96"} ${expandedPanel ? "right-0" : "right-0"} bottom-0 bg-white shadow-lg z-[1500] flex flex-col transition-all duration-300`}
        >
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <div>
              <h2 className="text-lg font-bold">Land Record Management</h2>
              <p className="text-sm text-gray-500">Manage land parcels and transactions</p>
            </div>
            <div className="flex items-center gap-2">
              {expandedPanel ? (
                <Button variant="ghost" size="sm" onClick={() => setExpandedPanel(false)}>
                  <Minimize2 size={16} />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setExpandedPanel(true)}>
                  <Maximize2 size={16} />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setShowLandRecordPanel(false)}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search parcels..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Acquired">Acquired</SelectItem>
                  <SelectItem value="In Process">In Process</SelectItem>
                  <SelectItem value="Disputed">Disputed</SelectItem>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => setShowAddParcelDialog(true)}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Parcel
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddTransactionDialog(true)}>
                  <FileText className="mr-1 h-3 w-3" />
                  Add Transaction
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={exportLandParcels}>
                  <FileDown className="mr-1 h-3 w-3" />
                  Export
                </Button>
                <Button size="sm" variant="outline" onClick={generateProcurementReport}>
                  <FileUp className="mr-1 h-3 w-3" />
                  Report
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="px-4 pt-2 border-b">
              <TabsTrigger value="parcels">Land Parcels</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="massavis">Massavis</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              {/* Land Parcels Tab */}
              <TabsContent value="parcels" className="p-4 h-full">
                {selectedParcel ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold">Parcel Details: {selectedParcel.parcelId}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedParcel(null)}>
                        Close
                      </Button>
                    </div>

                    <div className="rounded-md border p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Area</span>
                        <span className="text-sm font-medium">{selectedParcel.area.toLocaleString()} sq.m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Usage</span>
                        <span className="text-sm font-medium">{selectedParcel.usage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Zone</span>
                        <span className="text-sm font-medium">{selectedParcel.zone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status</span>
                        <Badge
                          variant={
                            selectedParcel.status === "Acquired"
                              ? "success"
                              : selectedParcel.status === "In Process"
                                ? "warning"
                                : selectedParcel.status === "Disputed"
                                  ? "destructive"
                                  : "default"
                          }
                        >
                          {selectedParcel.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Last Survey</span>
                        <span className="text-sm font-medium">{selectedParcel.lastSurvey}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Current Owner</span>
                        <span className="text-sm font-medium">
                          {selectedParcel.ownershipHistory.find((record) => record.to === null)?.owner || "None"}
                        </span>
                      </div>

                      {selectedParcel.massaviNumber && (
                        <>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Massavi Number</span>
                            <span className="text-sm font-medium">{selectedParcel.massaviNumber}</span>
                          </div>
                          {selectedParcel.massaviDate && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Massavi Date</span>
                              <span className="text-sm font-medium">{selectedParcel.massaviDate}</span>
                            </div>
                          )}
                          {selectedParcel.governmentDepartment && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Issuing Department</span>
                              <span className="text-sm font-medium">{selectedParcel.governmentDepartment}</span>
                            </div>
                          )}
                          {selectedParcel.landValue && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Estimated Value</span>
                              <span className="text-sm font-medium">₹{selectedParcel.landValue.toLocaleString()}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Ownership History</h4>
                      {selectedParcel.ownershipHistory.length > 0 ? (
                        <div className="rounded-md border overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Owner
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  From
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  To
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedParcel.ownershipHistory.map((record, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 text-sm">{record.owner}</td>
                                  <td className="px-4 py-2 text-sm">{record.from}</td>
                                  <td className="px-4 py-2 text-sm">{record.to || "Present"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="rounded-md border p-4 text-center text-gray-500 text-sm">
                          No ownership records found
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Transactions</h4>
                      {landTransactions.filter((t) => t.parcelId === selectedParcel.parcelId).length > 0 ? (
                        <div className="rounded-md border overflow-y-auto max-h-[200px]">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Type
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Amount
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Parties
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {landTransactions
                                .filter((t) => t.parcelId === selectedParcel.parcelId)
                                .map((transaction) => (
                                  <tr key={transaction.id}>
                                    <td className="px-4 py-2 text-sm">
                                      <Badge
                                        variant={
                                          transaction.type === "Acquisition"
                                            ? "success"
                                            : transaction.type === "Dispute"
                                              ? "destructive"
                                              : "default"
                                        }
                                      >
                                        {transaction.type}
                                      </Badge>
                                    </td>
                                    <td className="px-4 py-2 text-sm">{transaction.date}</td>
                                    <td className="px-4 py-2 text-sm">
                                      {transaction.amount > 0 ? `₹${transaction.amount.toLocaleString()}` : "-"}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {transaction.fromParty} {transaction.toParty ? `→ ${transaction.toParty}` : ""}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="rounded-md border p-4 text-center text-gray-500 text-sm">
                          No transactions found
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setDrawMode("modify")}>
                        <Pencil className="mr-1 h-3 w-3" />
                        Edit Boundary
                      </Button>
                      <Button size="sm" onClick={() => zoomToParcel(selectedParcel)}>
                        <MapIcon className="mr-1 h-3 w-3" />
                        Zoom to Parcel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredParcels.length > 0 ? (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Parcel ID</TableHead>
                              <TableHead>Area</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Massavi</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredParcels.map((parcel) => (
                              <TableRow key={parcel.id}>
                                <TableCell className="font-medium">{parcel.parcelId}</TableCell>
                                <TableCell>{parcel.area.toLocaleString()} sq.m</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      parcel.status === "Acquired"
                                        ? "success"
                                        : parcel.status === "In Process"
                                          ? "warning"
                                          : parcel.status === "Disputed"
                                            ? "destructive"
                                            : "default"
                                    }
                                  >
                                    {parcel.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{parcel.massaviNumber || "-"}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => zoomToParcel(parcel)}>
                                    <MapIcon className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedParcel(parcel)}>
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="rounded-md border p-4 text-center text-gray-500">
                        No land parcels found. Add a new parcel or adjust your search filters.
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">{filteredParcels.length} parcels found</div>
                      <Button size="sm" onClick={() => setDrawMode("polygon")}>
                        <Pencil className="mr-1 h-3 w-3" />
                        Draw Parcel
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="p-4 h-full">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parcel ID</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Massavi Ref</TableHead>
                          <TableHead>Stage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {landTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.parcelId}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  transaction.type === "Acquisition"
                                    ? "success"
                                    : transaction.type === "Dispute"
                                      ? "destructive"
                                      : "default"
                                }
                              >
                                {transaction.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              {transaction.amount > 0 ? `₹${transaction.amount.toLocaleString()}` : "-"}
                            </TableCell>
                            <TableCell>{transaction.massaviReference || "-"}</TableCell>
                            <TableCell>{transaction.procurementStage || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{landTransactions.length} transactions found</div>
                    <Button size="sm" onClick={() => setShowAddTransactionDialog(true)}>
                      <Plus className="mr-1 h-3 w-3" />
                      Add Transaction
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Massavis Tab */}
              <TabsContent value="massavis" className="p-4 h-full">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Massavi Number</TableHead>
                          <TableHead>Issue Date</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Area</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {governmentMassavis.map((massavi) => (
                          <TableRow key={massavi.id}>
                            <TableCell className="font-medium">{massavi.massaviNumber}</TableCell>
                            <TableCell>{massavi.issueDate}</TableCell>
                            <TableCell>{massavi.issuingDepartment}</TableCell>
                            <TableCell>{massavi.area.toLocaleString()} sq.m</TableCell>
                            <TableCell>₹{massavi.estimatedValue.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedMassavi(massavi)
                                  setShowMassaviDialog(true)
                                }}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => importMassavi(massavi)}>
                                <FileDown className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="text-sm text-gray-500">{governmentMassavis.length} government massavis available</div>
                </div>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="p-4 h-full">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Land Acquisition Summary</CardTitle>
                      <CardDescription>Overview of land acquisition status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <h3 className="mb-2 text-sm font-medium">Total Land Area</h3>
                          <div className="text-2xl font-bold">
                            {landParcels.reduce((sum, parcel) => sum + parcel.area, 0).toLocaleString()} sq.m
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {(landParcels.reduce((sum, parcel) => sum + parcel.area, 0) / 4047).toFixed(2)} acres
                            approximately
                          </p>
                        </div>

                        <div className="rounded-lg border p-3">
                          <h3 className="mb-2 text-sm font-medium">Acquisition Status</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Acquired</span>
                              <span className="font-medium">
                                {landParcels.filter((p) => p.status === "Acquired").length} parcels (
                                {landParcels
                                  .filter((p) => p.status === "Acquired")
                                  .reduce((sum, p) => sum + p.area, 0)
                                  .toLocaleString()}{" "}
                                sq.m)
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-muted">
                              <div
                                className="h-1.5 rounded-full bg-green-500"
                                style={{
                                  width: `${
                                    (landParcels
                                      .filter((p) => p.status === "Acquired")
                                      .reduce((sum, p) => sum + p.area, 0) /
                                      landParcels.reduce((sum, p) => sum + p.area, 0)) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>

                            <div className="flex justify-between text-sm">
                              <span>In Process</span>
                              <span className="font-medium">
                                {landParcels.filter((p) => p.status === "In Process").length} parcels (
                                {landParcels
                                  .filter((p) => p.status === "In Process")
                                  .reduce((sum, p) => sum + p.area, 0)
                                  .toLocaleString()}{" "}
                                sq.m)
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-muted">
                              <div
                                className="h-1.5 rounded-full bg-yellow-500"
                                style={{
                                  width: `${
                                    (landParcels
                                      .filter((p) => p.status === "In Process")
                                      .reduce((sum, p) => sum + p.area, 0) /
                                      landParcels.reduce((sum, p) => sum + p.area, 0)) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Summary</CardTitle>
                      <CardDescription>Land acquisition financial overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <h3 className="mb-2 text-sm font-medium">Total Investment</h3>
                          <div className="text-2xl font-bold">
                            ₹
                            {landTransactions
                              .filter((t) => t.type === "Acquisition")
                              .reduce((sum, t) => sum + t.amount, 0)
                              .toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">Total amount spent on land acquisition</p>
                        </div>

                        <div className="rounded-lg border p-3">
                          <h3 className="mb-2 text-sm font-medium">Cost Analysis</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Average Cost per sq.m</span>
                              <span className="font-medium">
                                ₹
                                {Math.round(
                                  landTransactions
                                    .filter((t) => t.type === "Acquisition")
                                    .reduce((sum, t) => sum + t.amount, 0) /
                                    landParcels
                                      .filter((p) => p.status === "Acquired")
                                      .reduce((sum, p) => sum + p.area, 0),
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button size="sm" onClick={generateProcurementReport}>
                      <FileDown className="mr-1 h-3 w-3" />
                      Generate Full Report
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className="text-sm font-medium mb-2">Tools</div>
          <div className="flex flex-col gap-1">
            <button
              className={`px-2 py-1 text-xs rounded ${drawMode === "polygon" ? "bg-emerald-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
              onClick={() => setDrawMode(drawMode === "polygon" ? null : "polygon")}
            >
              Draw Land Parcel
            </button>
            <button
              className={`px-2 py-1 text-xs rounded ${drawMode === "modify" ? "bg-emerald-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
              onClick={() => setDrawMode(drawMode === "modify" ? null : "modify")}
            >
              Modify Parcel
            </button>
            <button className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200" onClick={exportLandParcels}>
              Export Land Parcels
            </button>
          </div>
        </div>
      </div>

      {/* Map Type Selector */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="bg-white p-2 rounded-md shadow-md">
          <select
            className="text-sm p-1 border rounded outline-none"
            onChange={(e) => {
              if (!map) return

              const layers = map.getLayers()
              const osmLayer = layers.item(0)
              const satelliteLayer = layers.item(1)

              switch (e.target.value) {
                case "satellite":
                  osmLayer.setVisible(false)
                  satelliteLayer.setVisible(true)
                  break
                case "streets":
                  osmLayer.setVisible(true)
                  satelliteLayer.setVisible(false)
                  break
                case "hybrid":
                  // For hybrid, we'd need another layer, but for simplicity we'll use satellite
                  osmLayer.setVisible(false)
                  satelliteLayer.setVisible(true)
                  break
              }
            }}
          >
            <option value="satellite">Satellite</option>
            <option value="streets">Streets</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-4 right-4 z-[1000]">
        <div className="bg-white p-3 rounded-md shadow-md">
          <h3 className="font-medium text-sm mb-2">Map Layers</h3>
          <div className="space-y-1">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={true} // Always show land parcels
                className="mr-2"
                readOnly
              />
              Land Parcels
            </label>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={true} // Always show massavis
                className="mr-2"
                readOnly
              />
              Government Massavis
            </label>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={!!layers.buildings}
                onChange={(e) => {
                  const newLayers = { ...layers, buildings: e.target.checked }
                  // In a real app, you would update the layers state here
                }}
                className="mr-2"
              />
              Buildings
            </label>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={!!layers.roads}
                onChange={(e) => {
                  const newLayers = { ...layers, roads: e.target.checked }
                  // In a real app, you would update the layers state here
                }}
                className="mr-2"
              />
              Roads
            </label>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={!!layers.utilities}
                onChange={(e) => {
                  const newLayers = { ...layers, utilities: e.target.checked }
                  // In a real app, you would update the layers state here
                }}
                className="mr-2"
              />
              Utilities
            </label>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white p-2 rounded shadow-md">
        <div className="font-bold mb-2 text-sm">Map Legend</div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2 bg-[rgba(74,222,128,0.4)] border border-[#16a34a]"></div>
          <div className="text-xs">Acquired Land</div>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2 bg-[rgba(250,204,21,0.4)] border border-[#ca8a04]"></div>
          <div className="text-xs">In Process</div>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2 bg-[rgba(248,113,113,0.4)] border border-[#dc2626]"></div>
          <div className="text-xs">Disputed</div>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2 bg-[rgba(96,165,250,0.4)] border border-[#2563eb]"></div>
          <div className="text-xs">For Sale</div>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 mr-2 bg-[rgba(147,51,234,0.2)] border border-dashed border-[#7e22ce]"></div>
          <div className="text-xs">Government Massavi</div>
        </div>
      </div>

      {/* Toggle Land Record Panel Button */}
      {!showLandRecordPanel && (
        <button
          className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-md shadow-md"
          onClick={() => setShowLandRecordPanel(true)}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Add Land Parcel Dialog */}
      <Dialog open={showAddParcelDialog} onOpenChange={setShowAddParcelDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Land Parcel</DialogTitle>
            <DialogDescription>Enter the details of the new land parcel to be added to the system.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="parcelId" className="text-sm font-medium">
                  Parcel ID
                </label>
                <Input
                  id="parcelId"
                  value={newParcel.parcelId}
                  onChange={(e) => setNewParcel({ ...newParcel, parcelId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="area" className="text-sm font-medium">
                  Area (sq.m)
                </label>
                <Input
                  id="area"
                  type="number"
                  value={newParcel.area}
                  onChange={(e) => setNewParcel({ ...newParcel, area: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="usage" className="text-sm font-medium">
                  Usage
                </label>
                <Select value={newParcel.usage} onValueChange={(value) => setNewParcel({ ...newParcel, usage: value })}>
                  <SelectTrigger id="usage">
                    <SelectValue placeholder="Select usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Recreational">Recreational</SelectItem>
                    <SelectItem value="Agricultural">Agricultural</SelectItem>
                    <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="zone" className="text-sm font-medium">
                  Zone
                </label>
                <Select value={newParcel.zone} onValueChange={(value) => setNewParcel({ ...newParcel, zone: value })}>
                  <SelectTrigger id="zone">
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Zone A">Zone A</SelectItem>
                    <SelectItem value="Zone B">Zone B</SelectItem>
                    <SelectItem value="Zone C">Zone C</SelectItem>
                    <SelectItem value="Zone R">Zone R</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={newParcel.status}
                  onValueChange={(value) => setNewParcel({ ...newParcel, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Process">In Process</SelectItem>
                    <SelectItem value="Acquired">Acquired</SelectItem>
                    <SelectItem value="Disputed">Disputed</SelectItem>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="lastSurvey" className="text-sm font-medium">
                  Last Survey Date
                </label>
                <Input
                  id="lastSurvey"
                  type="date"
                  value={newParcel.lastSurvey}
                  onChange={(e) => setNewParcel({ ...newParcel, lastSurvey: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location (Longitude, Latitude)</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Longitude"
                  value={newParcel.center ? newParcel.center[0] : ""}
                  onChange={(e) =>
                    setNewParcel({
                      ...newParcel,
                      center: [Number.parseFloat(e.target.value), newParcel.center ? newParcel.center[1] : 0],
                    })
                  }
                />
                <Input
                  placeholder="Latitude"
                  value={newParcel.center ? newParcel.center[1] : ""}
                  onChange={(e) =>
                    setNewParcel({
                      ...newParcel,
                      center: [newParcel.center ? newParcel.center[0] : 0, Number.parseFloat(e.target.value)],
                    })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground">
                You can also draw the parcel directly on the map using the Draw tool.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="massaviNumber" className="text-sm font-medium">
                  Massavi Number
                </label>
                <Input
                  id="massaviNumber"
                  value={newParcel.massaviNumber}
                  onChange={(e) => setNewParcel({ ...newParcel, massaviNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="massaviDate" className="text-sm font-medium">
                  Massavi Date
                </label>
                <Input
                  id="massaviDate"
                  type="date"
                  value={newParcel.massaviDate}
                  onChange={(e) => setNewParcel({ ...newParcel, massaviDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="governmentDepartment" className="text-sm font-medium">
                Issuing Department
              </label>
              <Input
                id="governmentDepartment"
                value={newParcel.governmentDepartment}
                onChange={(e) => setNewParcel({ ...newParcel, governmentDepartment: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="landValue" className="text-sm font-medium">
                Estimated Land Value
              </label>
              <Input
                id="landValue"
                type="number"
                value={newParcel.landValue}
                onChange={(e) => setNewParcel({ ...newParcel, landValue: Number(e.target.value) })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowAddParcelDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={addLandParcel} className="bg-emerald-600 hover:bg-emerald-700">
              Add Parcel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Land Transaction Dialog */}
      <Dialog open={showAddTransactionDialog} onOpenChange={setShowAddTransactionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Land Transaction</DialogTitle>
            <DialogDescription>
              Enter the details of the new land transaction to be added to the system.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="parcelId" className="text-sm font-medium">
                Parcel ID
              </label>
              <Input
                id="parcelId"
                value={newTransaction.parcelId}
                onChange={(e) => setNewTransaction({ ...newTransaction, parcelId: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Type
                </label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acquisition">Acquisition</SelectItem>
                    <SelectItem value="Sale">Sale</SelectItem>
                    <SelectItem value="Dispute">Dispute</SelectItem>
                    <SelectItem value="Listing">Listing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="procurementStage" className="text-sm font-medium">
                  Procurement Stage
                </label>
                <Select
                  value={newTransaction.procurementStage}
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, procurementStage: value })}
                >
                  <SelectTrigger id="procurementStage">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Initial">Initial</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Approval">Approval</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="fromParty" className="text-sm font-medium">
                  From Party
                </label>
                <Input
                  id="fromParty"
                  value={newTransaction.fromParty}
                  onChange={(e) => setNewTransaction({ ...newTransaction, fromParty: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="toParty" className="text-sm font-medium">
                  To Party
                </label>
                <Input
                  id="toParty"
                  value={newTransaction.toParty}
                  onChange={(e) => setNewTransaction({ ...newTransaction, toParty: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="documents" className="text-sm font-medium">
                Documents (comma-separated)
              </label>
              <Input
                id="documents"
                value={newTransaction.documents ? newTransaction.documents.join(", ") : ""}
                onChange={(e) => setNewTransaction({ ...newTransaction, documents: e.target.value.split(", ") })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Input
                id="notes"
                value={newTransaction.notes}
                onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="massaviReference" className="text-sm font-medium">
                Massavi Reference
              </label>
              <Input
                id="massaviReference"
                value={newTransaction.massaviReference}
                onChange={(e) => setNewTransaction({ ...newTransaction, massaviReference: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowAddTransactionDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={addLandTransaction}
              disabled={!newTransaction.parcelId}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Add Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Massavi Details Dialog */}
      <Dialog open={showMassaviDialog} onOpenChange={setShowMassaviDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Government Massavi Details</DialogTitle>
            <DialogDescription>Details of the selected government massavi.</DialogDescription>
          </DialogHeader>

          {selectedMassavi && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Massavi Number</label>
                <div className="text-sm font-medium">{selectedMassavi.massaviNumber}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Date</label>
                <div className="text-sm font-medium">{selectedMassavi.issueDate}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Issuing Department</label>
                <div className="text-sm font-medium">{selectedMassavi.issuingDepartment}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Area</label>
                <div className="text-sm font-medium">{selectedMassavi.area.toLocaleString()} sq.m</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Value</label>
                <div className="text-sm font-medium">₹{selectedMassavi.estimatedValue.toLocaleString()}</div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setShowMassaviDialog(false)}>
              Close
            </Button>
            <Button
              type="button"
              onClick={() => importMassavi(selectedMassavi)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Import Massavi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

