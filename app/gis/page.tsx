"use client"

import { useState } from "react"
import { AlertCircle, Download, Filter, Layers, MapPin, Search, Settings } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

import GisMap from "@/components/gis/gis-map"

export default function GisPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Layer visibility state
  const [layers, setLayers] = useState({
    buildings: true,
    utilities: true,
    amenities: true,
    emergency: true,
    roads: true,
    greenAreas: true,
  })

  // Update layer visibility
  const toggleLayer = (layer) => {
    setLayers({
      ...layers,
      [layer]: !layers[layer],
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>
            Housing Society <span className="text-emerald-600">ERP</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
            <Download className="mr-2 h-4 w-4" />
            Export Map
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">GIS Management</h1>
              <p className="text-muted-foreground">Interactive maps and spatial data management</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <Settings className="mr-2 h-4 w-4" />
                Map Settings
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Map Layers</CardTitle>
                  <CardDescription>Toggle map layers visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="buildings"
                        checked={layers.buildings}
                        onCheckedChange={() => toggleLayer("buildings")}
                      />
                      <label
                        htmlFor="buildings"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Buildings
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="utilities"
                        checked={layers.utilities}
                        onCheckedChange={() => toggleLayer("utilities")}
                      />
                      <label
                        htmlFor="utilities"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Utilities
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="amenities"
                        checked={layers.amenities}
                        onCheckedChange={() => toggleLayer("amenities")}
                      />
                      <label
                        htmlFor="amenities"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Amenities
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emergency"
                        checked={layers.emergency}
                        onCheckedChange={() => toggleLayer("emergency")}
                      />
                      <label
                        htmlFor="emergency"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Emergency Points
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="roads" checked={layers.roads} onCheckedChange={() => toggleLayer("roads")} />
                      <label
                        htmlFor="roads"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Roads & Paths
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="greenAreas"
                        checked={layers.greenAreas}
                        onCheckedChange={() => toggleLayer("greenAreas")}
                      />
                      <label
                        htmlFor="greenAreas"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Green Areas
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Search</CardTitle>
                  <CardDescription>Find locations on map</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search map..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="rounded-lg border p-3">
                      <h3 className="text-sm font-medium mb-2">Quick Access</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                          <MapPin className="h-4 w-4" />
                          <span>Clubhouse</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                          <MapPin className="h-4 w-4" />
                          <span>Swimming Pool</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                          <MapPin className="h-4 w-4" />
                          <span>Main Gate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                          <MapPin className="h-4 w-4" />
                          <span>Emergency Exit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Points</CardTitle>
                  <CardDescription>Critical infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {emergencyPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                        <AlertCircle className={`h-5 w-5 ${point.color}`} />
                        <div>
                          <div className="text-sm font-medium">{point.name}</div>
                          <div className="text-xs text-muted-foreground">{point.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3 space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>Interactive Society Map</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Layers className="mr-2 h-4 w-4" />
                        Base Map
                      </Button>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px] w-full">
                    <GisMap layers={layers} />
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="utilities">
                <TabsList className="bg-emerald-50 text-emerald-900">
                  <TabsTrigger value="utilities" className="data-[state=active]:bg-white">
                    Utilities
                  </TabsTrigger>
                  <TabsTrigger value="amenities" className="data-[state=active]:bg-white">
                    Amenities
                  </TabsTrigger>
                  <TabsTrigger value="parcels" className="data-[state=active]:bg-white">
                    Land Parcels
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="utilities">
                  <Card>
                    <CardHeader>
                      <CardTitle>Utility Infrastructure</CardTitle>
                      <CardDescription>Water, electricity, and other utility points</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Utility Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Checked</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {utilities.map((utility) => (
                            <TableRow key={utility.id}>
                              <TableCell className="font-medium">{utility.type}</TableCell>
                              <TableCell>{utility.location}</TableCell>
                              <TableCell>
                                <span
                                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                                    utility.status === "Operational"
                                      ? "bg-green-100 text-green-800"
                                      : utility.status === "Maintenance"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {utility.status}
                                </span>
                              </TableCell>
                              <TableCell>{utility.lastChecked}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View on Map
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="amenities">
                  <Card>
                    <CardHeader>
                      <CardTitle>Community Amenities</CardTitle>
                      <CardDescription>Recreational and community facilities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {amenities.map((amenity) => (
                          <Card key={amenity.id}>
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">{amenity.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Location:</span>
                                  <span className="text-sm">{amenity.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Status:</span>
                                  <span
                                    className={`text-sm ${
                                      amenity.status === "Open"
                                        ? "text-green-500"
                                        : amenity.status === "Closing Soon"
                                          ? "text-yellow-500"
                                          : "text-red-500"
                                    }`}
                                  >
                                    {amenity.status}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Hours:</span>
                                  <span className="text-sm">{amenity.hours}</span>
                                </div>
                                <Button variant="outline" className="w-full mt-2">
                                  View on Map
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="parcels">
                  <Card>
                    <CardHeader>
                      <CardTitle>Land Parcels</CardTitle>
                      <CardDescription>Society land division and management</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parcel ID</TableHead>
                            <TableHead>Area (sq.m)</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Zone</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {landParcels.map((parcel) => (
                            <TableRow key={parcel.id}>
                              <TableCell className="font-medium">{parcel.parcelId}</TableCell>
                              <TableCell>{parcel.area}</TableCell>
                              <TableCell>{parcel.usage}</TableCell>
                              <TableCell>{parcel.zone}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View on Map
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const emergencyPoints = [
  {
    name: "Fire Hydrant 1",
    location: "Near Building A",
    color: "text-red-500",
  },
  {
    name: "Fire Hydrant 2",
    location: "Near Building C",
    color: "text-red-500",
  },
  {
    name: "Emergency Exit",
    location: "South Gate",
    color: "text-green-500",
  },
  {
    name: "First Aid Station",
    location: "Clubhouse",
    color: "text-blue-500",
  },
  {
    name: "Assembly Point",
    location: "Central Garden",
    color: "text-yellow-500",
  },
]

const utilities = [
  {
    id: 1,
    type: "Water Pump Station",
    location: "Behind Building B",
    status: "Operational",
    lastChecked: "2023-03-15",
  },
  {
    id: 2,
    type: "Electrical Transformer",
    location: "Near East Entrance",
    status: "Operational",
    lastChecked: "2023-03-20",
  },
  {
    id: 3,
    type: "Sewage Treatment Plant",
    location: "South-west Corner",
    status: "Maintenance",
    lastChecked: "2023-03-25",
  },
  {
    id: 4,
    type: "Water Tank",
    location: "Building A Roof",
    status: "Operational",
    lastChecked: "2023-03-22",
  },
  {
    id: 5,
    type: "Generator Room",
    location: "Near Clubhouse",
    status: "Operational",
    lastChecked: "2023-03-18",
  },
]

const amenities = [
  {
    id: 1,
    name: "Swimming Pool",
    location: "Behind Building C",
    status: "Closed",
    hours: "6:00 AM - 9:00 PM",
  },
  {
    id: 2,
    name: "Tennis Court",
    location: "East Side",
    status: "Open",
    hours: "6:00 AM - 10:00 PM",
  },
  {
    id: 3,
    name: "Children's Park",
    location: "Central Garden",
    status: "Open",
    hours: "6:00 AM - 8:00 PM",
  },
  {
    id: 4,
    name: "Gym",
    location: "Clubhouse, First Floor",
    status: "Open",
    hours: "5:00 AM - 10:00 PM",
  },
  {
    id: 5,
    name: "Multipurpose Hall",
    location: "Clubhouse, Ground Floor",
    status: "Open",
    hours: "9:00 AM - 9:00 PM",
  },
  {
    id: 6,
    name: "Yoga Room",
    location: "Clubhouse, First Floor",
    status: "Closing Soon",
    hours: "6:00 AM - 8:00 PM",
  },
]

const landParcels = [
  {
    id: 1,
    parcelId: "LP-001",
    area: 5000,
    usage: "Residential",
    zone: "Zone A",
  },
  {
    id: 2,
    parcelId: "LP-002",
    area: 5000,
    usage: "Residential",
    zone: "Zone B",
  },
  {
    id: 3,
    parcelId: "LP-003",
    area: 3000,
    usage: "Recreational",
    zone: "Common Area",
  },
  {
    id: 4,
    parcelId: "LP-004",
    area: 500,
    usage: "Utility",
    zone: "Restricted",
  },
  {
    id: 5,
    parcelId: "LP-005",
    area: 1200,
    usage: "Parking",
    zone: "Common Area",
  },
]

