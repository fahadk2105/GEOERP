import Link from "next/link"
import { Activity, Building2, Home, MapPin, User, Users, Wallet } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import FinancialOverview from "@/components/dashboard/financial-overview"
import MemberStats from "@/components/dashboard/member-stats"
import MaintenanceAlerts from "@/components/dashboard/maintenance-alerts"
import { StatCard } from "@/components/dashboard/stat-card"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6 text-emerald-600" />
            <span>GEO-ERP by TechGIS</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          <Link
            href="/land"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <MapPin className="h-5 w-5" />
            Land Management
          </Link>
          <Link
            href="/financial"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <Wallet className="h-5 w-5" />
            Financial Management
          </Link>
          <Link
            href="/members"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <Users className="h-5 w-5" />
            Members Management
          </Link>
          <Link
            href="/hr"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <User className="h-5 w-5" />
            HR Management
          </Link>
          <Link
            href="/infrastructure"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <Building2 className="h-5 w-5" />
            Infrastructure Management
          </Link>
          <Link
            href="/gis"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-600"
          >
            <MapPin className="h-5 w-5" />
            GIS Module
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-6">
          <h1 className="text-xl font-semibold">
            GEO-ERP by<span className="text-emerald-600">TechGIS</span>
          </h1>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome to the GEO-ERP System. Here's an overview of all operations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Members"
                value="256"
                description="+12 from last month"
                icon={<Users className="h-5 w-5 text-muted-foreground" />}
              />
              <StatCard
                title="Monthly Collection"
                value="PKR 458,230"
                description="+8.1% from last month"
                icon={<Wallet className="h-5 w-5 text-muted-foreground" />}
              />
              <StatCard
                title="Pending Maintenance"
                value="12"
                description="4 high priority"
                icon={<Activity className="h-5 w-5 text-muted-foreground" />}
              />
              <StatCard
                title="Total Buildings"
                value="14"
                description="42 floors"
                icon={<Building2 className="h-5 w-5 text-muted-foreground" />}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>Monthly income and expense breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <FinancialOverview />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Member Statistics</CardTitle>
                  <CardDescription>Distribution by building</CardDescription>
                </CardHeader>
                <CardContent>
                  <MemberStats />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Access</CardTitle>
                  <CardDescription>Navigate to frequently used modules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/gis">
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-emerald-50 hover:border-emerald-200">
                        <MapPin className="h-6 w-6 text-emerald-600" />
                        <span className="text-sm font-medium">GIS Map</span>
                      </div>
                    </Link>
                    <Link href="/financial">
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-emerald-50 hover:border-emerald-200">
                        <Wallet className="h-6 w-6 text-emerald-600" />
                        <span className="text-sm font-medium">Billing</span>
                      </div>
                    </Link>
                    <Link href="/members">
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-emerald-50 hover:border-emerald-200">
                        <User className="h-6 w-6 text-emerald-600" />
                        <span className="text-sm font-medium">Members</span>
                      </div>
                    </Link>
                    <Link href="/infrastructure">
                      <div className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-emerald-50 hover:border-emerald-200">
                        <Building2 className="h-6 w-6 text-emerald-600" />
                        <span className="text-sm font-medium">Buildings</span>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Maintenance Alerts</CardTitle>
                  <CardDescription>Recent and upcoming maintenance activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <MaintenanceAlerts />
                </CardContent>
                <CardFooter>
                  <Link
                    href="/infrastructure/maintenance"
                    className="text-sm font-medium text-emerald-600 hover:underline"
                  >
                    View all maintenance tasks
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

