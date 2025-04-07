"use client"

import { useState } from "react"
import { Calendar, Download, Filter, Plus, Search, UserPlus2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const employees = [
  {
    id: 1,
    name: "Atta Ullah",
    position: "Security Head",
    department: "Security",
    email: "Atta.Ullah@example.com",
    phone: "+92 231 1234567",
    profileImage: "/placeholder-user.jpg",
    status: "Active",
    baseSalary: 25000,
    allowances: 5000,
    deductions: 3000,
    performance: {
      attendance: 98,
      taskCompletion: 95,
      quality: 92,
    },
  },
  {
    id: 2,
    name: "Hammad Iqbal",
    position: "Maintenance Supervisor",
    department: "Maintenance",
    email: "Hammad.Iqbal@example.com",
    phone: "+92 231 1234567",
    profileImage: "/placeholder-user.jpg",
    status: "Active",
    baseSalary: 22000,
    allowances: 4000,
    deductions: 2500,
    performance: {
      attendance: 96,
      taskCompletion: 88,
      quality: 85,
    },
  },
  {
    id: 3,
    name: "Zafar Imtiaz",
    position: "Security Guard",
    department: "Security",
    email: "Zafar.Imtiaz@example.com",
    phone: "+92 231 1234567",
    profileImage: "/placeholder-user.jpg",
    status: "On Leave",
    baseSalary: 15000,
    allowances: 3000,
    deductions: 1500,
    performance: {
      attendance: 78,
      taskCompletion: 82,
      quality: 75,
    },
  },
  {
    id: 4,
    name: "Bibi Khatoon",
    position: "Housekeeping Supervisor",
    department: "Housekeeping",
    email: "Bibi.Khatoon@example.com",
    phone: "+92 231 1234567",
    profileImage: "/placeholder-user.jpg",
    status: "Active",
    baseSalary: 18000,
    allowances: 3500,
    deductions: 2000,
    performance: {
      attendance: 95,
      taskCompletion: 90,
      quality: 88,
    },
  },
  {
    id: 5,
    name: "Ahsan Iqbal",
    position: "Admin Assistant",
    department: "Administration",
    email: "Ahsan.Iqbal@example.com",
    phone: "+92 231 1234567",
    profileImage: "/placeholder-user.jpg",
    status: "Active",
    baseSalary: 20000,
    allowances: 4000,
    deductions: 2500,
    performance: {
      attendance: 92,
      taskCompletion: 88,
      quality: 90,
    },
  },
]

// Helper function to calculate overall performance rating
function getOverallRating(performance) {
  return Math.round((performance.attendance + performance.taskCompletion + performance.quality) / 3)
}

export default function HrPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <UserPlus2 className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Human Resource Management</h1>
              <p className="text-muted-foreground">Manage staff, track performance, and process payroll</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>HR Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">Total Staff</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">Departments</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">98%</div>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Open Positions</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h3 className="mb-2 text-sm font-medium">Department Size</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Security</span>
                        <span className="font-medium">10 (41.7%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-blue-500" style={{ width: "41.7%" }} />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Maintenance</span>
                        <span className="font-medium">7 (29.2%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-green-500" style={{ width: "29.2%" }} />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Housekeeping</span>
                        <span className="font-medium">5 (20.8%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-yellow-500" style={{ width: "20.8%" }} />
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Administration</span>
                        <span className="font-medium">2 (8.3%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-purple-500" style={{ width: "8.3%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h3 className="mb-2 text-sm font-medium">Upcoming Events</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Staff Meeting</p>
                          <p className="text-xs text-muted-foreground">Apr 5, 2023 · 10:00 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Payday</p>
                          <p className="text-xs text-muted-foreground">Apr 7, 2023</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium">Training Session</p>
                          <p className="text-xs text-muted-foreground">Apr 10, 2023 · 2:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Staff Directory</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search staff..."
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
                        <DropdownMenuItem>All Staff</DropdownMenuItem>
                        <DropdownMenuItem>Security</DropdownMenuItem>
                        <DropdownMenuItem>Maintenance</DropdownMenuItem>
                        <DropdownMenuItem>Housekeeping</DropdownMenuItem>
                        <DropdownMenuItem>Administration</DropdownMenuItem>
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
                <Tabs defaultValue="employees">
                  <TabsList className="bg-emerald-50 text-emerald-900">
                    <TabsTrigger value="employees" className="data-[state=active]:bg-white">
                      Employees
                    </TabsTrigger>
                    <TabsTrigger value="payroll" className="data-[state=active]:bg-white">
                      Payroll
                    </TabsTrigger>
                    <TabsTrigger value="performance" className="data-[state=active]:bg-white">
                      Performance
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="employees">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredEmployees.map((employee) => (
                            <TableRow key={employee.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                    {employee.profileImage ? (
                                      <Image
                                        src={employee.profileImage || "/placeholder.svg"}
                                        alt={employee.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                      />
                                    ) : (
                                      <span className="text-sm font-medium">{employee.name.charAt(0)}</span>
                                    )}
                                  </div>
                                  <span>{employee.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{employee.position}</TableCell>
                              <TableCell>
                                <span
                                  className={
                                    employee.department === "Security"
                                      ? "text-blue-500"
                                      : employee.department === "Maintenance"
                                        ? "text-green-500"
                                        : employee.department === "Housekeeping"
                                          ? "text-yellow-500"
                                          : "text-purple-500"
                                  }
                                >
                                  {employee.department}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="text-xs">{employee.email}</span>
                                  <span className="text-xs text-muted-foreground">{employee.phone}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={
                                    employee.status === "Active"
                                      ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                                      : employee.status === "On Leave"
                                        ? "rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
                                        : "rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800"
                                  }
                                >
                                  {employee.status}
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
                  <TabsContent value="payroll">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payroll Management</CardTitle>
                        <CardDescription>Process and view salary information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Monthly Payroll</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">PKR3,62,500</div>
                                <p className="text-xs text-muted-foreground">Total monthly salary expenses</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Next Payday</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">April 7</div>
                                <p className="text-xs text-muted-foreground">3 days from now</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Pending Approvals</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">2</div>
                                <p className="text-xs text-muted-foreground">Overtime approvals pending</p>
                              </CardContent>
                            </Card>
                          </div>

                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Basic Salary</TableHead>
                                <TableHead>Allowances</TableHead>
                                <TableHead>Deductions</TableHead>
                                <TableHead className="text-right">Net Salary</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {employees.slice(0, 5).map((employee) => (
                                <TableRow key={employee.id}>
                                  <TableCell>{employee.name}</TableCell>
                                  <TableCell>{employee.position}</TableCell>
                                  <TableCell>PKR{employee.baseSalary.toLocaleString("en-IN")}</TableCell>
                                  <TableCell>PKR{employee.allowances.toLocaleString("en-IN")}</TableCell>
                                  <TableCell>PKR{employee.deductions.toLocaleString("en-IN")}</TableCell>
                                  <TableCell className="text-right">
                                    PKR
                                    {(employee.baseSalary + employee.allowances - employee.deductions).toLocaleString(
                                      "en-IN",
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="performance">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                        <CardDescription>Track employee performance and evaluation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="rounded-lg border p-4">
                            <h3 className="mb-2 text-sm font-medium">Performance Overview</h3>
                            <div className="grid grid-cols-4 gap-4 text-center">
                              <div className="rounded-lg border p-3">
                                <div className="text-xl font-bold text-green-500">8</div>
                                <p className="text-xs text-muted-foreground">Excellent</p>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="text-xl font-bold text-blue-500">12</div>
                                <p className="text-xs text-muted-foreground">Good</p>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="text-xl font-bold text-yellow-500">3</div>
                                <p className="text-xs text-muted-foreground">Average</p>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="text-xl font-bold text-red-500">1</div>
                                <p className="text-xs text-muted-foreground">Poor</p>
                              </div>
                            </div>
                          </div>

                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Attendance</TableHead>
                                <TableHead>Task Completion</TableHead>
                                <TableHead>Quality</TableHead>
                                <TableHead className="text-right">Overall Rating</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {employees.slice(0, 5).map((employee) => (
                                <TableRow key={employee.id}>
                                  <TableCell>{employee.name}</TableCell>
                                  <TableCell>{employee.department}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-full rounded-full bg-muted">
                                        <div
                                          className={`h-2 rounded-full ${employee.performance.attendance >= 90
                                            ? "bg-green-500"
                                            : employee.performance.attendance >= 75
                                              ? "bg-blue-500"
                                              : employee.performance.attendance >= 60
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                          style={{ width: `${employee.performance.attendance}%` }}
                                        />
                                      </div>
                                      <span className="text-xs">{employee.performance.attendance}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-full rounded-full bg-muted">
                                        <div
                                          className={`h-2 rounded-full ${employee.performance.taskCompletion >= 90
                                            ? "bg-green-500"
                                            : employee.performance.taskCompletion >= 75
                                              ? "bg-blue-500"
                                              : employee.performance.taskCompletion >= 60
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                          style={{ width: `${employee.performance.taskCompletion}%` }}
                                        />
                                      </div>
                                      <span className="text-xs">{employee.performance.taskCompletion}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-full rounded-full bg-muted">
                                        <div
                                          className={`h-2 rounded-full ${employee.performance.quality >= 90
                                            ? "bg-green-500"
                                            : employee.performance.quality >= 75
                                              ? "bg-blue-500"
                                              : employee.performance.quality >= 60
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                          style={{ width: `${employee.performance.quality}%` }}
                                        />
                                      </div>
                                      <span className="text-xs">{employee.performance.quality}%</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <span
                                      className={`rounded-full px-2 py-1 text-xs font-medium ${getOverallRating(employee.performance) >= 90
                                        ? "bg-green-100 text-green-800"
                                        : getOverallRating(employee.performance) >= 75
                                          ? "bg-blue-100 text-blue-800"
                                          : getOverallRating(employee.performance) >= 60
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                      {getOverallRating(employee.performance)}%
                                    </span>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

