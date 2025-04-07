"use client"

import { useState } from "react"
import { Download, Filter, Layers, MapPin, Plus, Search, FileText, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import LandParcelMap from "@/components/land/land-parcel-map"
import type { LandParcel, LandTransaction } from "@/components/land/land-record-types"

export default function LandPage() {
  const [selectedZone, setSelectedZone] = useState("all")
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null)
  const [landParcels, setLandParcels] = useState<LandParcel[]>(sampleLandParcels)
  const [landTransactions, setLandTransactions] = useState<LandTransaction[]>(sampleTransactions)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddParcelDialog, setShowAddParcelDialog] = useState(false)
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false)
  const [newParcel, setNewParcel] = useState<Omit<LandParcel, "id" | "ownershipHistory">>({
    parcelId: `LP-${String(landParcels.length + 1).padStart(3, "0")}`,
    area: 0,
    usage: "Residential",
    zone: "Zone A",
    status: "In Process",
    lastSurvey: new Date().toISOString().split("T")[0],
    center: [77.209, 28.614],
  })
  const [newTransaction, setNewTransaction] = useState<Omit<LandTransaction, "id">>({
    parcelId: "",
    type: "Acquisition",
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    fromParty: "",
    toParty: "",
    documents: [],
    notes: "",
  })

  // Filter parcels based on zone selection and search query
  const filteredParcels = landParcels.filter(
    (parcel) =>
      (selectedZone === "all" || parcel.zone === selectedZone) &&
      (searchQuery === "" ||
        parcel.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.usage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.zone.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Add a new land parcel
  const addLandParcel = () => {
    const newParcelRecord: LandParcel = {
      id: landParcels.length + 1,
      ...newParcel,
      ownershipHistory: [],
    }

    setLandParcels((prev) => [...prev, newParcelRecord])
    setShowAddParcelDialog(false)

    // Reset form
    setNewParcel({
      parcelId: `LP-${String(landParcels.length + 2).padStart(3, "0")}`,
      area: 0,
      usage: "Residential",
      zone: "Zone A",
      status: "In Process",
      lastSurvey: new Date().toISOString().split("T")[0],
      center: [77.209, 28.614],
    })
  }

  // Add a new land transaction
  const addLandTransaction = () => {
    const newTransactionRecord: LandTransaction = {
      id: landTransactions.length + 1,
      ...newTransaction,
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
                  owner: newTransaction.toParty,
                  from: newTransaction.date,
                  to: null,
                },
              ],
            }
            : parcel,
        ),
      )
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
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>
            GEO-ERP by <span className="text-emerald-600">TechGIS</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Land Parcel
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Land Management</h1>
              <p className="text-muted-foreground">Manage land parcels, zoning, and property records</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <FileText className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="parcels">
            <TabsList className="bg-emerald-50 text-emerald-900">
              <TabsTrigger value="parcels" className="data-[state=active]:bg-white">
                Land Parcels
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-white">
                Transactions
              </TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-white">
                Map View
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-white">
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Land Parcels Tab */}
            <TabsContent value="parcels">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Land Parcels</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search parcels..."
                          className="pl-8 w-[250px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={selectedZone} onValueChange={setSelectedZone}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Zones</SelectItem>
                          <SelectItem value="Zone A">Zone A</SelectItem>
                          <SelectItem value="Zone B">Zone B</SelectItem>
                          <SelectItem value="Zone C">Zone C</SelectItem>
                          <SelectItem value="Zone R">Zone R</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        More Filters
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parcel ID</TableHead>
                          <TableHead>Area (sq.m)</TableHead>
                          <TableHead>Usage</TableHead>
                          <TableHead>Zone</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Survey</TableHead>
                          <TableHead>Current Owner</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredParcels.map((parcel) => (
                          <TableRow key={parcel.id}>
                            <TableCell className="font-medium">{parcel.parcelId}</TableCell>
                            <TableCell>{parcel.area.toLocaleString()}</TableCell>
                            <TableCell>{parcel.usage}</TableCell>
                            <TableCell>{parcel.zone}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${parcel.status === "Acquired"
                                  ? "bg-green-100 text-green-800"
                                  : parcel.status === "In Process"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : parcel.status === "Disputed"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                              >
                                {parcel.status}
                              </span>
                            </TableCell>
                            <TableCell>{parcel.lastSurvey}</TableCell>
                            <TableCell>
                              {parcel.ownershipHistory.find((record) => record.to === null)?.owner || "None"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => setSelectedParcel(parcel)}>
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

              {/* Selected Parcel Details */}
              {selectedParcel && (
                <Card className="mt-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Parcel Details: {selectedParcel.parcelId}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedParcel(null)}>
                        Close
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Parcel Information */}
                      <div className="space-y-4">
                        <h3 className="text-md font-semibold">Parcel Information</h3>
                        <div className="rounded-md border p-4 space-y-2">
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
                            <span
                              className={`text-sm font-medium px-2 py-0.5 rounded-full ${selectedParcel.status === "Acquired"
                                ? "bg-green-100 text-green-800"
                                : selectedParcel.status === "In Process"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : selectedParcel.status === "Disputed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                            >
                              {selectedParcel.status}
                            </span>
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
                        </div>
                      </div>

                      {/* Ownership History */}
                      <div className="space-y-4">
                        <h3 className="text-md font-semibold">Ownership History</h3>
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

                      {/* Parcel Transactions */}
                      <div className="space-y-4">
                        <h3 className="text-md font-semibold">Transactions</h3>
                        {landTransactions.filter((t) => t.parcelId === selectedParcel.parcelId).length > 0 ? (
                          <div className="rounded-md border overflow-y-auto max-h-[300px]">
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
                                        <span
                                          className={`px-2 py-0.5 rounded-full text-xs ${transaction.type === "Acquisition"
                                            ? "bg-green-100 text-green-800"
                                            : transaction.type === "Dispute"
                                              ? "bg-red-100 text-red-800"
                                              : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                          {transaction.type}
                                        </span>
                                      </td>
                                      <td className="px-4 py-2 text-sm">{transaction.date}</td>
                                      <td className="px-4 py-2 text-sm">
                                        {transaction.amount > 0 ? `PKR${transaction.amount.toLocaleString()}` : "-"}
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
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Land Transactions</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search transactions..." className="pl-8 w-[250px]" />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Transaction type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="acquisition">Acquisition</SelectItem>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="dispute">Dispute</SelectItem>
                          <SelectItem value="listing">Listing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parcel ID</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>From Party</TableHead>
                          <TableHead>To Party</TableHead>
                          <TableHead>Documents</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {landTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.parcelId}</TableCell>
                            <TableCell>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${transaction.type === "Acquisition"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.type === "Dispute"
                                    ? "bg-red-100 text-red-800"
                                    : transaction.type === "Sale"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                              >
                                {transaction.type}
                              </span>
                            </TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              {transaction.amount > 0 ? `PKR${transaction.amount.toLocaleString()}` : "-"}
                            </TableCell>
                            <TableCell>{transaction.fromParty}</TableCell>
                            <TableCell>{transaction.toParty || "-"}</TableCell>
                            <TableCell>
                              {transaction.documents.length > 0 ? (
                                <div className="flex gap-1">
                                  {transaction.documents.map((doc, index) => (
                                    <span key={index} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                                      {doc.split("_")[0]}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                "-"
                              )}
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

            {/* Map View Tab */}
            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Land Parcels Map</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Layers className="mr-2 h-4 w-4" />
                        Toggle Layers
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px] w-full mb-4">
                    <LandParcelMap selectedZone={selectedZone} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Click on a parcel to view details</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        View Full Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <div className="grid gap-6 md:grid-cols-2">
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
                                width: `${(landParcels
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
                                width: `${(landParcels
                                  .filter((p) => p.status === "In Process")
                                  .reduce((sum, p) => sum + p.area, 0) /
                                  landParcels.reduce((sum, p) => sum + p.area, 0)) *
                                  100
                                  }%`,
                              }}
                            />
                          </div>

                          <div className="flex justify-between text-sm">
                            <span>Disputed</span>
                            <span className="font-medium">
                              {landParcels.filter((p) => p.status === "Disputed").length} parcels (
                              {landParcels
                                .filter((p) => p.status === "Disputed")
                                .reduce((sum, p) => sum + p.area, 0)
                                .toLocaleString()}{" "}
                              sq.m)
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted">
                            <div
                              className="h-1.5 rounded-full bg-red-500"
                              style={{
                                width: `${(landParcels
                                  .filter((p) => p.status === "Disputed")
                                  .reduce((sum, p) => sum + p.area, 0) /
                                  landParcels.reduce((sum, p) => sum + p.area, 0)) *
                                  100
                                  }%`,
                              }}
                            />
                          </div>

                          <div className="flex justify-between text-sm">
                            <span>For Sale</span>
                            <span className="font-medium">
                              {landParcels.filter((p) => p.status === "For Sale").length} parcels (
                              {landParcels
                                .filter((p) => p.status === "For Sale")
                                .reduce((sum, p) => sum + p.area, 0)
                                .toLocaleString()}{" "}
                              sq.m)
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted">
                            <div
                              className="h-1.5 rounded-full bg-blue-500"
                              style={{
                                width: `${(landParcels
                                  .filter((p) => p.status === "For Sale")
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
                          PKR
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
                              PKR
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

                          <div className="flex justify-between text-sm">
                            <span>Pending Transactions</span>
                            <span className="font-medium">
                              {landParcels.filter((p) => p.status === "In Process").length} parcels
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span>Estimated Pending Cost</span>
                            <span className="font-medium">
                              PKR
                              {Math.round(
                                landParcels
                                  .filter((p) => p.status === "In Process")
                                  .reduce((sum, p) => sum + p.area, 0) *
                                (landTransactions
                                  .filter((t) => t.type === "Acquisition")
                                  .reduce((sum, t) => sum + t.amount, 0) /
                                  landParcels
                                    .filter((p) => p.status === "Acquired")
                                    .reduce((sum, p) => sum + p.area, 0)),
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <h3 className="mb-2 text-sm font-medium">Recent Transactions</h3>
                        <div className="space-y-2">
                          {landTransactions.slice(0, 3).map((transaction, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {transaction.date} - {transaction.type}
                              </span>
                              <span className="font-medium">
                                {transaction.amount > 0 ? `PKR${transaction.amount.toLocaleString()}` : "-"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

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
                You can also draw the parcel directly on the map in the Map View tab.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddParcelDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addLandParcel}>Add Parcel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Transaction Dialog */}
      <Dialog open={showAddTransactionDialog} onOpenChange={setShowAddTransactionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>Record a new land transaction in the system.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="parcelId" className="text-sm font-medium">
                Parcel ID
              </label>
              <Select
                value={newTransaction.parcelId}
                onValueChange={(value) => setNewTransaction({ ...newTransaction, parcelId: value })}
              >
                <SelectTrigger id="parcelId">
                  <SelectValue placeholder="Select parcel" />
                </SelectTrigger>
                <SelectContent>
                  {landParcels.map((parcel) => (
                    <SelectItem key={parcel.id} value={parcel.parcelId}>
                      {parcel.parcelId} - {parcel.usage} ({parcel.area.toLocaleString()} sq.m)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Transaction Type
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
                    <SelectItem value="Survey">Survey</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                  className="pl-9"
                  placeholder="Transaction amount"
                />
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
                  placeholder="e.g., Government"
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
                  placeholder="e.g., Housing Society"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Input
                id="notes"
                value={newTransaction.notes}
                onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                placeholder="Additional transaction details"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTransactionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addLandTransaction} disabled={!newTransaction.parcelId || !newTransaction.fromParty}>
              Add Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Sample land parcels data
const sampleLandParcels: LandParcel[] = [
  {
    id: 1,
    parcelId: "LP-001",
    area: 5000,
    usage: "Residential",
    zone: "Zone A",
    status: "Acquired",
    lastSurvey: "2023-05-15",
    center: [77.208, 28.6135],
    ownershipHistory: [
      {
        owner: "Housing Society",
        from: "2023-05-15",
        to: null,
      },
    ],
  },
  {
    id: 2,
    parcelId: "LP-002",
    area: 4500,
    usage: "Residential",
    zone: "Zone B",
    status: "In Process",
    lastSurvey: "2023-06-20",
    center: [77.2095, 28.6135],
    ownershipHistory: [],
  },
  {
    id: 3,
    parcelId: "LP-003",
    area: 3000,
    usage: "Commercial",
    zone: "Zone C",
    status: "Disputed",
    lastSurvey: "2023-04-10",
    center: [77.208, 28.6143],
    ownershipHistory: [
      {
        owner: "Previous Owner",
        from: "2020-01-01",
        to: "2023-04-10",
      },
    ],
  },
  {
    id: 4,
    parcelId: "LP-004",
    area: 2500,
    usage: "Recreational",
    zone: "Zone A",
    status: "For Sale",
    lastSurvey: "2023-07-05",
    center: [77.2095, 28.6143],
    ownershipHistory: [
      {
        owner: "Government",
        from: "2000-01-01",
        to: null,
      },
    ],
  },
]

// Sample land transactions data
const sampleTransactions: LandTransaction[] = [
  {
    id: 1,
    parcelId: "LP-001",
    type: "Acquisition",
    date: "2023-05-15",
    amount: 5000000,
    fromParty: "Government",
    toParty: "Housing Society",
    documents: ["deed_LP001.pdf", "survey_LP001.pdf"],
    notes: "Initial acquisition from government",
  },
  {
    id: 2,
    parcelId: "LP-003",
    type: "Dispute",
    date: "2023-04-10",
    amount: 0,
    fromParty: "Previous Owner",
    toParty: "Housing Society",
    documents: ["dispute_LP003.pdf"],
    notes: "Ownership disputed by previous owner",
  },
  {
    id: 3,
    parcelId: "LP-004",
    type: "Listing",
    date: "2023-07-05",
    amount: 3000000,
    fromParty: "Government",
    toParty: "",
    documents: ["listing_LP004.pdf"],
    notes: "Listed for sale by government",
  },
]

