"use client"

import { useState } from "react"
import { Download, Filter, Plus, Search, UserPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.flatNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Member Management</h1>
              <p className="text-muted-foreground">Manage society members, view profiles and payment history</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <Download className="mr-2 h-4 w-4" />
                Export Members
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Member Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">256</div>
                      <p className="text-xs text-muted-foreground">Total Members</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">184</div>
                      <p className="text-xs text-muted-foreground">Owners</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">72</div>
                      <p className="text-xs text-muted-foreground">Tenants</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">14</div>
                      <p className="text-xs text-muted-foreground">New (30 days)</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h3 className="mb-2 text-sm font-medium">Payment Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Paid</span>
                        <span className="font-medium">214 (83.6%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-green-500" style={{ width: "83.6%" }} />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Partial</span>
                        <span className="font-medium">28 (10.9%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-yellow-500" style={{ width: "10.9%" }} />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Unpaid</span>
                        <span className="font-medium">14 (5.5%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-red-500" style={{ width: "5.5%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Member Directory</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search members..."
                        className="pl-8 w-[250px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>All Members</DropdownMenuItem>
                        <DropdownMenuItem>Owners</DropdownMenuItem>
                        <DropdownMenuItem>Tenants</DropdownMenuItem>
                        <DropdownMenuItem>Committee Members</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list">
                  <TabsList className="bg-emerald-50 text-emerald-900">
                    <TabsTrigger value="list" className="data-[state=active]:bg-white">
                      List View
                    </TabsTrigger>
                    <TabsTrigger value="grid" className="data-[state=active]:bg-white">
                      Grid View
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Flat No.</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredMembers.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                    {member.profileImage ? (
                                      <Image
                                        src={member.profileImage || "/placeholder.svg"}
                                        alt={member.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                      />
                                    ) : (
                                      <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                                    )}
                                  </div>
                                  <span>{member.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{member.flatNo}</TableCell>
                              <TableCell>
                                <span className={member.type === "Owner" ? "text-blue-500" : "text-purple-500"}>
                                  {member.type}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="text-xs">{member.email}</span>
                                  <span className="text-xs text-muted-foreground">{member.phone}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={
                                    member.paymentStatus === "Paid"
                                      ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                                      : member.paymentStatus === "Partial"
                                        ? "rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
                                        : "rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800"
                                  }
                                >
                                  {member.paymentStatus}
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
                  </TabsContent>
                  <TabsContent value="grid">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredMembers.map((member) => (
                        <Card key={member.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center text-center">
                              <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                {member.profileImage ? (
                                  <Image
                                    src={member.profileImage || "/placeholder.svg"}
                                    alt={member.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <span className="text-2xl font-medium">{member.name.charAt(0)}</span>
                                )}
                              </div>
                              <h3 className="font-medium">{member.name}</h3>
                              <p className="text-sm text-muted-foreground">{member.flatNo}</p>
                              <div className="my-2">
                                <span
                                  className={
                                    member.type === "Owner"
                                      ? "rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                      : "rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800"
                                  }
                                >
                                  {member.type}
                                </span>
                              </div>
                              <p className="text-sm">{member.email}</p>
                              <p className="text-sm text-muted-foreground">{member.phone}</p>
                              <div className="mt-3 flex gap-2">
                                <Button variant="outline" size="sm">
                                  View Profile
                                </Button>
                                <Button variant="outline" size="sm">
                                  Message
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

const members = [
  {
    id: 1,
    name: "Ishaq Riaz",
    flatNo: "A101",
    type: "Owner",
    email: "raj.sharma@example.com",
    phone: "+91 98765 43210",
    profileImage: "/placeholder-user.jpg",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    name: "Ashiq Dogar",
    flatNo: "B205",
    type: "Owner",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    profileImage: "/placeholder-user.jpg",
    paymentStatus: "Paid",
  },
  {
    id: 3,
    name: "Farhan Mehmood",
    flatNo: "C310",
    type: "Tenant",
    email: "amit.singh@example.com",
    phone: "+91 76543 21098",
    profileImage: "/placeholder-user.jpg",
    paymentStatus: "Unpaid",
  },
  {
    id: 4,
    name: "Asad Mumtaz",
    flatNo: "D412",
    type: "Owner",
    email: "anjali.verma@example.com",
    phone: "+91 65432 10987",
    profileImage: "/placeholder-user.jpg",
    paymentStatus: "Partial",
  },
  {
    id: 5,
    name: "Jamal Din",
    flatNo: "E515",
    type: "Tenant",
    email: "vikram.malhotra@example.com",
    phone: "+91 54321 09876",
    profileImage: "/placeholder-user.jpg",
    paymentStatus: "Unpaid",
  },
]

