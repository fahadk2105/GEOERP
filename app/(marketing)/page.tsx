import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, CheckCircle, MapPin, Shield, Users, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Building2 className="h-6 w-6 text-primary" />
            <span>GEO-ERP by TechGIS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden md:flex">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[center_top_-1px] border-b border-gray-100" />
          <div className="relative">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              Streamline Your Housing Society Management
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Manage Your Society <br className="hidden sm:inline" />
              <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl mb-12">
              A comprehensive ERP solution designed specifically for housing societies. Simplify management, improve
              transparency, and enhance community living.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-12 px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container mt-16 md:mt-24">
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-t-xl border border-gray-200 bg-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent z-10 h-24 w-full bottom-0" />
            <Image
              src="/placeholder.svg?height=720&width=1280"
              width={1280}
              height={720}
              alt="Housing Society ERP Dashboard"
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Comprehensive Management Modules
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Our ERP system offers a complete suite of modules to handle every aspect of housing society management.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Land Management</h3>
              <p className="text-muted-foreground">
                Efficiently manage land parcels, track ownership history, and handle property transactions with
                integrated GIS capabilities.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Financial Management</h3>
              <p className="text-muted-foreground">
                Track income, expenses, and generate financial reports. Manage maintenance charges, billing, and payment
                collection.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Member Management</h3>
              <p className="text-muted-foreground">
                Maintain detailed resident profiles, track ownership and tenancy, and facilitate community
                communication.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Infrastructure Management</h3>
              <p className="text-muted-foreground">
                Monitor building maintenance, manage common facilities, and schedule preventive maintenance activities.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">GIS Integration</h3>
              <p className="text-muted-foreground">
                Visualize society layout with interactive maps, locate utilities, and manage spatial data effectively.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Security & Compliance</h3>
              <p className="text-muted-foreground">
                Ensure data security, maintain regulatory compliance, and generate required statutory reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Transform Your Housing Society Management
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Increased Efficiency</h3>
                    <p className="text-muted-foreground">
                      Automate routine tasks and streamline workflows to save time and reduce administrative burden.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Enhanced Transparency</h3>
                    <p className="text-muted-foreground">
                      Provide members with access to financial records, meeting minutes, and society documents.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Improved Financial Management</h3>
                    <p className="text-muted-foreground">
                      Track income and expenses accurately, generate financial reports, and ensure compliance with
                      accounting standards.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Better Decision Making</h3>
                    <p className="text-muted-foreground">
                      Access comprehensive data and analytics to make informed decisions about society management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-primary/5 -z-10" />
              <Image
                src="/placeholder.svg?height=600&width=600"
                width={600}
                height={600}
                alt="Housing Society Management"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Trusted by Housing Societies
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              See what our customers have to say about their experience with our ERP solution.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">GV</span>
                </div>
                <div>
                  <h4 className="font-bold">Green Valley Society</h4>
                  <p className="text-sm text-muted-foreground">Mumbai, India</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "This ERP system has completely transformed how we manage our society. The financial module has made
                billing and collection so much easier, and the transparency has improved member satisfaction."
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">SH</span>
                </div>
                <div>
                  <h4 className="font-bold">Sunshine Heights</h4>
                  <p className="text-sm text-muted-foreground">Delhi, India</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The land management module has been invaluable for our society. We can now easily track all property
                transactions and maintain accurate ownership records with the integrated GIS capabilities."
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">RP</span>
                </div>
                <div>
                  <h4 className="font-bold">Royal Palms</h4>
                  <p className="text-sm text-muted-foreground">Bangalore, India</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The infrastructure management module has helped us maintain our facilities more efficiently. We can now
                schedule preventive maintenance and track all repair work in one place."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Choose the plan that fits your society's needs. All plans include core features with no hidden costs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-8">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-muted-foreground mb-6">For small housing societies</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹2,999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 50 units</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Financial Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Member Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Basic Reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Email Support</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>

            <div className="rounded-lg border bg-white p-8 shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Standard</h3>
              <p className="text-muted-foreground mb-6">For medium-sized societies</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹5,999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 200 units</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>All Basic features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Land Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Infrastructure Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>GIS Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>

            <div className="rounded-lg border bg-white p-8">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-muted-foreground mb-6">For large housing complexes</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹9,999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Unlimited units</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>All Standard features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom Reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>API Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>24/7 Dedicated Support</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Request a personalized demo to see how our Housing Society ERP can transform your management processes.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Your Name" className="rounded-md border border-input px-4 py-2 text-sm" />
              <input
                type="email"
                placeholder="Your Email"
                className="rounded-md border border-input px-4 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Society Name"
                className="rounded-md border border-input px-4 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Number of Units"
                className="rounded-md border border-input px-4 py-2 text-sm"
              />
              <textarea
                placeholder="Additional Information"
                className="rounded-md border border-input px-4 py-2 text-sm sm:col-span-2"
                rows={4}
              ></textarea>
            </div>
            <Button size="lg" className="mt-6 px-8">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <span>Housing Society ERP</span>
              </div>
              <p className="text-muted-foreground mb-4">
                A comprehensive ERP solution designed specifically for housing societies.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2023 Housing Society ERP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

