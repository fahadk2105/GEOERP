"use client"

import { useState } from "react"
import {
  Building,
  Calendar,
  Download,
  List,
  Plus,
  Search,
  Settings,
  CuboidIcon as ThreeDCube,
  PenToolIcon as Tool,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import BuildingModel from "@/components/infrastructure/building-model"

export default function InfrastructurePage() {
  const [selectedBuilding, setSelectedBuilding] = useState("all")

  // Filter maintenance tasks based on building selection
  const filteredTasks = maintenanceTasks.filter(
    (task) => selectedBuilding === "all" || task.building === selectedBuilding,
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>
            GEO-ERP by<span className="text-emerald-600">TechGIS</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Facility
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Infrastructure Management</h1>
              <p className="text-muted-foreground">Manage buildings, facilities, and maintenance schedules</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          <Tabs defaultValue="buildings">
            <TabsList className="bg-emerald-50 text-emerald-900">
              <TabsTrigger value="buildings" className="data-[state=active]:bg-white">
                Buildings
              </TabsTrigger>
              <TabsTrigger value="facilities" className="data-[state=active]:bg-white">
                Facilities
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="data-[state=active]:bg-white">
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-white">
                Bookings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="buildings">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Society Buildings</CardTitle>
                    <CardDescription>View and manage all buildings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="relative w-full max-w-sm">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input type="search" placeholder="Search buildings..." className="pl-8 w-full" />
                        </div>
                        <Button variant="outline" size="sm">
                          <List className="mr-2 h-4 w-4" />
                          View All
                        </Button>
                      </div>

                      <div className="max-h-[400px] overflow-auto rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Building</TableHead>
                              <TableHead>Floors</TableHead>
                              <TableHead>Units</TableHead>
                              <TableHead>Built Year</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {buildings.map((building) => (
                              <TableRow key={building.id}>
                                <TableCell>
                                  <div className="font-medium">{building.name}</div>
                                </TableCell>
                                <TableCell>{building.floors}</TableCell>
                                <TableCell>{building.units}</TableCell>
                                <TableCell>{building.builtYear}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedBuilding(building.id)}>
                                    <ThreeDCube className="mr-2 h-4 w-4" />
                                    View 3D
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Building Visualization</CardTitle>
                    <CardDescription>Interactive 3D model of selected building</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] rounded-md border">
                      <BuildingModel buildingId={selectedBuilding} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Building Statistics</CardTitle>
                    <CardDescription>Overview of the society infrastructure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-medium">Total Buildings</span>
                        </div>
                        <div className="mt-3 text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground">256 residential units</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2">
                          <Tool className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm font-medium">Ongoing Maintenance</span>
                        </div>
                        <div className="mt-3 text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">2 high priority</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium">Facility Bookings</span>
                        </div>
                        <div className="mt-3 text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">For next 7 days</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2">
                          <Settings className="h-5 w-5 text-purple-500" />
                          <span className="text-sm font-medium">Amenities</span>
                        </div>
                        <div className="mt-3 text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">All functional</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="facilities">
              <div className="grid gap-6 md:grid-cols-3">
                {facilities.map((facility) => (
                  <Card key={facility.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{facility.name}</CardTitle>
                        <facility.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription>{facility.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border p-3">
                            <div className="text-sm font-medium">Capacity</div>
                            <div className="text-lg font-bold">{facility.capacity}</div>
                          </div>
                          <div className="rounded-lg border p-3">
                            <div className="text-sm font-medium">Status</div>
                            <div
                              className={`text-lg font-bold ${facility.status === "Available"
                                  ? "text-green-500"
                                  : facility.status === "Booked"
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }`}
                            >
                              {facility.status}
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium">Facilities</div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {facility.amenities.map((amenity, index) => (
                              <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="w-full" variant="outline">
                            Details
                          </Button>
                          <Button className="w-full">Book Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="maintenance">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Maintenance Schedule</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by building" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Buildings</SelectItem>
                          {buildings.map((building) => (
                            <SelectItem key={building.id} value={building.id}>
                              {building.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Task
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Building</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <div className="font-medium">{task.task}</div>
                              <div className="text-xs text-muted-foreground">{task.description}</div>
                            </TableCell>
                            <TableCell>{task.building}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{task.date}</span>
                                <span className="text-xs text-muted-foreground">{task.time}</span>
                              </div>
                            </TableCell>
                            <TableCell>{task.assignedTo}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${task.priority === "High"
                                    ? "bg-red-100 text-red-800"
                                    : task.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                              >
                                {task.priority}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${task.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : task.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : task.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {task.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Facility Bookings</CardTitle>
                  <CardDescription>Manage bookings for common facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Facility</TableHead>
                          <TableHead>Booked By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time Slot</TableHead>
                          <TableHead>Purpose</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div className="font-medium">{booking.facility}</div>
                            </TableCell>
                            <TableCell>{booking.bookedBy}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>{booking.timeSlot}</TableCell>
                            <TableCell>{booking.purpose}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${booking.status === "Confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {booking.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Approve
                              </Button>
                              <Button variant="ghost" size="sm">
                                Cancel
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

const buildings = [
  {
    id: "building-a",
    name: "Building A",
    floors: 8,
    units: 32,
    builtYear: 2015,
  },
  {
    id: "building-b",
    name: "Building B",
    floors: 8,
    units: 32,
    builtYear: 2015,
  },
  {
    id: "building-c",
    name: "Building C",
    floors: 10,
    units: 40,
    builtYear: 2016,
  },
  {
    id: "building-d",
    name: "Building D",
    floors: 10,
    units: 40,
    builtYear: 2016,
  },
  {
    id: "building-e",
    name: "Building E",
    floors: 12,
    units: 48,
    builtYear: 2017,
  },
  {
    id: "clubhouse",
    name: "Clubhouse",
    floors: 2,
    units: 1,
    builtYear: 2015,
  },
]

const facilities = [
  {
    id: 1,
    name: "Multipurpose Hall",
    location: "Clubhouse, Ground Floor",
    capacity: "100 people",
    status: "Available",
    amenities: ["AC", "Sound System", "Projector", "Chairs", "Tables"],
    icon: Building,
  },
  {
    id: 2,
    name: "Swimming Pool",
    location: "Behind Building C",
    capacity: "30 people",
    status: "Under Maintenance",
    amenities: ["Changing Rooms", "Showers", "Lifeguard", "Pool Chairs"],
    icon: Building,
  },
  {
    id: 3,
    name: "Gym",
    location: "Clubhouse, First Floor",
    capacity: "20 people",
    status: "Available",
    amenities: ["AC", "Cardio Equipment", "Weights", "Trainers", "Lockers"],
    icon: Building,
  },
  {
    id: 4,
    name: "Tennis Court",
    location: "Near Building E",
    capacity: "4 people",
    status: "Booked",
    amenities: ["Lights", "Net", "Seating"],
    icon: Building,
  },
  {
    id: 5,
    name: "Children's Play Area",
    location: "Central Garden",
    capacity: "25 children",
    status: "Available",
    amenities: ["Swings", "Slides", "Climbing Frame", "Sandbox", "Benches"],
    icon: Building,
  },
  {
    id: 6,
    name: "Yoga Room",
    location: "Clubhouse, First Floor",
    capacity: "15 people",
    status: "Available",
    amenities: ["AC", "Mats", "Mirrors", "Sound System"],
    icon: Building,
  },
]

const maintenanceTasks = [
  {
    id: 1,
    task: "Elevator Maintenance",
    description: "Regular monthly maintenance of all elevators",
    building: "building-a",
    date: "2023-04-10",
    time: "10:00 AM - 2:00 PM",
    assignedTo: "Sunil Verma",
    priority: "High",
    status: "Scheduled",
  },
  {
    id: 2,
    task: "Swimming Pool Cleaning",
    description: "Weekly cleaning and chemical balance check",
    building: "building-c",
    date: "2023-04-05",
    time: "7:00 AM - 10:00 AM",
    assignedTo: "Lakshmi Devi",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    task: "Garden Landscaping",
    description: "Monthly landscaping and garden maintenance",
    building: "all",
    date: "2023-04-08",
    time: "9:00 AM - 5:00 PM",
    assignedTo: "Garden Services",
    priority: "Low",
    status: "Scheduled",
  },
  {
    id: 4,
    task: "Water Tank Cleaning",
    description: "Quarterly cleaning of all water tanks",
    building: "building-b",
    date: "2023-04-15",
    time: "8:00 AM - 4:00 PM",
    assignedTo: "Cleaning Contractors",
    priority: "High",
    status: "Pending",
  },
  {
    id: 5,
    task: "Roof Inspection",
    description: "Check for leaks and damages after recent rains",
    building: "building-d",
    date: "2023-04-03",
    time: "11:00 AM - 1:00 PM",
    assignedTo: "Sunil Verma",
    priority: "Medium",
    status: "Completed",
  },
]

const bookings = [
  {
    id: 1,
    facility: "Multipurpose Hall",
    bookedBy: "Younis Malik (A101)",
    date: "2023-04-15",
    timeSlot: "6:00 PM - 10:00 PM",
    purpose: "Birthday Celebration",
    status: "Confirmed",
  },
  {
    id: 2,
    facility: "Tennis Court",
    bookedBy: "Babar Naz (E515)",
    date: "2023-04-05",
    timeSlot: "7:00 AM - 9:00 AM",
    purpose: "Regular Play",
    status: "Confirmed",
  },
  {
    id: 3,
    facility: "Multipurpose Hall",
    bookedBy: "Fariya (B205)",
    date: "2023-04-20",
    timeSlot: "10:00 AM - 12:00 PM",
    purpose: "Committee Meeting",
    status: "Pending",
  },
  {
    id: 4,
    facility: "Gym",
    bookedBy: "Mubarak Shah (C310)",
    date: "2023-04-06",
    timeSlot: "6:00 PM - 7:00 PM",
    purpose: "Personal Training",
    status: "Confirmed",
  },
  {
    id: 5,
    facility: "Yoga Room",
    bookedBy: "Ali Mukhtar (D412)",
    date: "2023-04-10",
    timeSlot: "7:00 AM - 8:00 AM",
    purpose: "Yoga Class",
    status: "Confirmed",
  },
]

