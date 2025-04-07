import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Building2,
  CheckCircle,
  MapPin,
  Shield,
  Users,
  Wallet,
  BarChart3,
  Globe,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span>GEO-ERP by TechGIS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="#modules"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Modules
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden md:flex">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-white"></div>
        <div className="container relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-8">
              <div>
                <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-6">
                  Smart Society Management
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Manage Your Society <span className="text-emerald-600">Effortlessly</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl mb-8 max-w-md">
                  A comprehensive ERP solution designed specifically for housing societies. Simplify management, improve
                  transparency, and enhance community living.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 h-12 px-6 shadow-lg shadow-emerald-600/20"
                  >
                    Explore Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="h-12 px-6 border-emerald-200 hover:bg-emerald-50">
                    Request Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center"
                    >
                      <span className="text-xs font-medium text-emerald-700">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground"></span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden border shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&h=720&q=80"
                  width={720}
                  height={720}
                  alt="Housing Society ERP Dashboard"
                  className="w-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-emerald-100 -z-10"></div>
              <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-teal-100 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}


      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-4">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything You Need to Manage Your Society
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Our ERP system offers a complete suite of features to handle every aspect of housing society management.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl border p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <MapPin className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">GIS Integration</h3>
              <p className="text-muted-foreground">
                Visualize society layout with interactive maps, locate utilities, and manage spatial data effectively.
              </p>
              <div className="mt-4">
                <Link
                  href="/gis"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                >
                  Explore GIS Module
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Wallet className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Financial Management</h3>
              <p className="text-muted-foreground">
                Track income, expenses, and generate financial reports. Manage maintenance charges, billing, and payment
                collection.
              </p>
              <div className="mt-4">
                <Link
                  href="/financial"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                >
                  Explore Financial Module
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Member Management</h3>
              <p className="text-muted-foreground">
                Maintain detailed resident profiles, track ownership and tenancy, and facilitate community
                communication.
              </p>
              <div className="mt-4">
                <Link
                  href="/members"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                >
                  Explore Member Module
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Building2 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Infrastructure Management</h3>
              <p className="text-muted-foreground">
                Monitor building maintenance, manage common facilities, and schedule preventive maintenance activities.
              </p>
              <div className="mt-4">
                <Link
                  href="/infrastructure"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                >
                  Explore Infrastructure Module
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Globe className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Land Management</h3>
              <p className="text-muted-foreground">
                Efficiently manage land parcels, track ownership history, and handle property transactions with
                integrated GIS capabilities.
              </p>
              <div className="mt-4">
                <Link
                  href="/land"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                >
                  Explore Land Module
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Security & Compliance</h3>
              <p className="text-muted-foreground">
                Ensure data security, maintain regulatory compliance, and generate required statutory reports.
              </p>
              <div className="mt-4">
                <Link
                  href="/hr"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                >
                  Explore HR Module
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Transform Your Housing Society Management
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Our comprehensive solution helps you streamline operations and enhance community living
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Increased Efficiency</h3>
                    <p className="text-muted-foreground">
                      Automate routine tasks and streamline workflows to save time and reduce administrative burden. Our
                      intuitive interface makes complex management tasks simple.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Enhanced Transparency</h3>
                    <p className="text-muted-foreground">
                      Provide members with access to financial records, meeting minutes, and society documents. Build
                      trust through clear communication and accountability.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Wallet className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Improved Financial Management</h3>
                    <p className="text-muted-foreground">
                      Track income and expenses accurately, generate financial reports, and ensure compliance with
                      accounting standards. Make informed financial decisions with real-time data.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Better Decision Making</h3>
                    <p className="text-muted-foreground">
                      Access comprehensive data and analytics to make informed decisions about society management.
                      Visualize trends and patterns to plan for the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative order-1 md:order-2">
              <div className="absolute -inset-4 rounded-xl bg-emerald-100 -z-10"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80"
                  width={600}
                  height={600}
                  alt="Housing Society Management"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-emerald-200 -z-10"></div>
              <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-teal-200 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Showcase */}
      <section id="modules" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-4">
              Comprehensive Solution
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Integrated Modules for Complete Management
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Our platform offers seamless integration between all aspects of housing society management
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative bg-emerald-50">
                <Image
                  src="https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
                  width={600}
                  height={400}
                  alt="GIS Module"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">GIS Module</h3>
                    <p className="text-white/80">Interactive maps and spatial data management</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Our GIS module provides interactive maps of your society, allowing you to visualize property
                  boundaries, utility lines, and common areas. Track spatial data and integrate with land management.
                </p>
                <Link href="/gis">
                  <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                    Explore GIS Module
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video relative bg-emerald-50">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
                  width={600}
                  height={400}
                  alt="Financial Module"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Financial Module</h3>
                    <p className="text-white/80">Complete financial management and reporting</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  Manage all financial aspects of your society including maintenance collection, expense tracking,
                  financial reporting, and budget planning. Generate invoices and track payments easily.
                </p>
                <Link href="/financial">
                  <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 text-emerald-700">
                    Explore Financial Module
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <div className="rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Member Management</h3>
                <p className="text-muted-foreground mb-4">
                  Maintain detailed resident profiles, track ownership and tenancy, and facilitate community
                  communication.
                </p>
                <Link href="/members">
                  <Button variant="link" className="p-0 h-auto text-emerald-600 hover:text-emerald-700">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Infrastructure Management</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor building maintenance, manage common facilities, and schedule preventive maintenance
                  activities.
                </p>
                <Link href="/infrastructure">
                  <Button variant="link" className="p-0 h-auto text-emerald-600 hover:text-emerald-700">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Land Management</h3>
                <p className="text-muted-foreground mb-4">
                  Efficiently manage land parcels, track ownership history, and handle property transactions with
                  integrated GIS capabilities.
                </p>
                <Link href="/land">
                  <Button variant="link" className="p-0 h-auto text-emerald-600 hover:text-emerald-700">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}


      {/* Demo Request Section */}
      <section id="demo" className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 bg-emerald-50">
                  <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-6">
                    Get Started Today
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-6">
                    Ready to Transform Your Society Management?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Request a personalized demo to see how our Housing Society ERP can streamline your operations and
                    enhance community living.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span>Personalized walkthrough of all modules</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span>Custom implementation plan for your society</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span>Free consultation with our experts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span>No obligation 30-day free trial</span>
                    </li>
                  </ul>
                </div>
                <div className="p-8 md:p-12">
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm font-medium">
                            First name
                          </label>
                          <input
                            id="first-name"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm font-medium">
                            Last name
                          </label>
                          <input
                            id="last-name"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="society-name" className="text-sm font-medium">
                          Society Name
                        </label>
                        <input
                          id="society-name"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                          placeholder="Green Valley Society"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="units" className="text-sm font-medium">
                          Number of Units
                        </label>
                        <input
                          id="units"
                          type="number"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                          placeholder="50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Additional Information
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                          placeholder="Tell us about your specific requirements..."
                        ></textarea>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Request Demo
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16 bg-gray-50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-6">
                <Building2 className="h-6 w-6 text-emerald-600" />
                <span>GEO-ERP by TechGIS</span>
              </div>
              <p className="text-muted-foreground mb-6">
                A comprehensive ERP solution designed specifically for housing societies. Simplify management, improve
                transparency, and enhance community living.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#modules" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Modules
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 TechGIS Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

