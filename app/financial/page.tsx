"use client"

import { useState } from "react"
import { ArrowUpDown, Download, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import FinancialOverview from "@/components/dashboard/financial-overview"

export default function FinancialPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

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
            New Transaction
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
              <p className="text-muted-foreground">Manage your society's financial transactions and budgets</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Income</CardTitle>
                <CardDescription>Current {selectedPeriod} period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">PKR4,58,230</div>
                <p className="text-xs text-green-500">+8.1% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Expenses</CardTitle>
                <CardDescription>Current {selectedPeriod} period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">PKR2,50,150</div>
                <p className="text-xs text-red-500">+2.4% from last period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Net Balance</CardTitle>
                <CardDescription>Current {selectedPeriod} period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">PKR2,08,080</div>
                <p className="text-xs text-green-500">+15.2% from last period</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Income vs Expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialOverview />
            </CardContent>
          </Card>

          <Tabs defaultValue="transactions">
            <TabsList className="bg-emerald-50 text-emerald-900">
              <TabsTrigger value="transactions" className="data-[state=active]:bg-white">
                Transactions
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-white">
                Billing
              </TabsTrigger>
              <TabsTrigger value="budgets" className="data-[state=active]:bg-white">
                Budgets
              </TabsTrigger>
            </TabsList>
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Transactions</CardTitle>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search transactions..." className="w-[250px]" />
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Sort
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>
                            <span className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">PKR{transaction.amount.toLocaleString("en-IN")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Management</CardTitle>
                  <CardDescription>Manage member bills and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Payment Collection</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold">PKR4,12,500</div>
                              <p className="text-sm text-muted-foreground">Total collected this month</p>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-red-500">PKR45,730</div>
                              <p className="text-sm text-muted-foreground">Outstanding amount</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Payment Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-green-500">214</div>
                              <p className="text-sm text-muted-foreground">Paid</p>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-yellow-500">28</div>
                              <p className="text-sm text-muted-foreground">Partial</p>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-red-500">14</div>
                              <p className="text-sm text-muted-foreground">Unpaid</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Flat No.</TableHead>
                            <TableHead>Member Name</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {billingData.map((bill) => (
                            <TableRow key={bill.id}>
                              <TableCell>{bill.flatNo}</TableCell>
                              <TableCell>{bill.memberName}</TableCell>
                              <TableCell>{bill.dueDate}</TableCell>
                              <TableCell>PKR{bill.amount.toLocaleString("en-IN")}</TableCell>
                              <TableCell>
                                <span
                                  className={
                                    bill.status === "Paid"
                                      ? "text-green-500"
                                      : bill.status === "Partial"
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                  }
                                >
                                  {bill.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Remind
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
            </TabsContent>
            <TabsContent value="budgets">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Planning</CardTitle>
                  <CardDescription>Manage and track society budgets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {budgets.map((budget) => (
                        <Card key={budget.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">{budget.category}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Allocated</span>
                                <span className="font-medium">PKR{budget.allocated.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Spent</span>
                                <span className="font-medium">PKR{budget.spent.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Remaining</span>
                                <span className="font-medium">
                                  PKR{(budget.allocated - budget.spent).toLocaleString("en-IN")}
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className={`h-2 rounded-full ${(budget.spent / budget.allocated) > 0.9
                                    ? "bg-red-500"
                                    : budget.spent / budget.allocated > 0.7
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                    }`}
                                  style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {Math.round((budget.spent / budget.allocated) * 100)}% of budget used
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
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

const transactions = [
  {
    id: 1,
    date: "2023-03-25",
    description: "Maintenance Fee - Flat A101",
    category: "Maintenance",
    type: "income",
    amount: 5000,
  },
  {
    id: 2,
    date: "2023-03-24",
    description: "Electricity Bill Payment",
    category: "Utilities",
    type: "expense",
    amount: 45000,
  },
  {
    id: 3,
    date: "2023-03-22",
    description: "Maintenance Fee - Flat B205",
    category: "Maintenance",
    type: "income",
    amount: 5000,
  },
  {
    id: 4,
    date: "2023-03-20",
    description: "Garden Maintenance",
    category: "Maintenance",
    type: "expense",
    amount: 15000,
  },
  {
    id: 5,
    date: "2023-03-18",
    description: "Maintenance Fee - Flat C310",
    category: "Maintenance",
    type: "income",
    amount: 5000,
  },
]

const billingData = [
  {
    id: 1,
    flatNo: "A101",
    memberName: "Muhammad Rizwan",
    dueDate: "2023-04-05",
    amount: 5000,
    status: "Paid",
  },
  {
    id: 2,
    flatNo: "B205",
    memberName: "Waqqas Mukhtar",
    dueDate: "2023-04-05",
    amount: 5000,
    status: "Paid",
  },
  {
    id: 3,
    flatNo: "C310",
    memberName: "Choudhary jameel",
    dueDate: "2023-04-05",
    amount: 5000,
    status: "Unpaid",
  },
  {
    id: 4,
    flatNo: "D412",
    memberName: "Muhammad Amin",
    dueDate: "2023-04-05",
    amount: 5000,
    status: "Partial",
  },
  {
    id: 5,
    flatNo: "E515",
    memberName: "Ghulam Rasool",
    dueDate: "2023-04-05",
    amount: 5000,
    status: "Unpaid",
  },
]

const budgets = [
  {
    id: 1,
    category: "Maintenance",
    allocated: 200000,
    spent: 125000,
  },
  {
    id: 2,
    category: "Utilities",
    allocated: 300000,
    spent: 275000,
  },
  {
    id: 3,
    category: "Security",
    allocated: 150000,
    spent: 90000,
  },
]

