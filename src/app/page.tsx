"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  Upload,
  CheckCircle2,
  Share2,
  Lock,
  Zap,
  Globe,
  FileCheck,
  Building2,
  Heart,
  Briefcase,
  Home,
  Truck,
  Scale,
  ArrowRight,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                New
              </Badge>
              <span className="text-sm font-medium">Universal Trust Layer</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              The Trust Layer for
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                Global Transactions
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Attest, verify, and share proof with confidence — across any industry.
              No blockchain, no central authority, just instant trust.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" asChild className="text-lg px-8 h-12 group">
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 h-12">
                <Link href="/verify">Verify a Document</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              {[
                { label: "Instant Verification", value: "< 1s" },
                { label: "Global Trust", value: "∞" },
                { label: "Free Forever", value: "$0" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold"
              >
                How It Works
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Three simple steps to create immutable proof
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Upload,
                  title: "Upload",
                  description: "Upload any document or paste text. We support PDF, DOCX, PNG, and more.",
                  step: "01",
                },
                {
                  icon: FileCheck,
                  title: "Attest",
                  description: "Generate a unique cryptographic hash using SHA-256 encryption.",
                  step: "02",
                },
                {
                  icon: Share2,
                  title: "Verify",
                  description: "Share your attestation link or QR code. Anyone can verify instantly.",
                  step: "03",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow h-full border-2 hover:border-primary/50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-lg bg-primary/10 w-fit">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-6xl font-bold text-primary/10">
                          {item.step}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold"
              >
                Built for Trust
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Enterprise-grade features without the enterprise cost
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Proof without Blockchain",
                  description: "Cryptographic proof using SHA-256 hashing. No expensive blockchain fees.",
                },
                {
                  icon: Globe,
                  title: "Universal Trust Layer",
                  description: "Works across any vertical: legal, finance, healthcare, HR, and more.",
                },
                {
                  icon: Zap,
                  title: "Instant Verification Links",
                  description: "Share proof instantly with unique links and QR codes.",
                },
                {
                  icon: Lock,
                  title: "Military-Grade Encryption",
                  description: "SHA-256 cryptographic hashing ensures data integrity.",
                },
                {
                  icon: CheckCircle2,
                  title: "Enterprise-Ready API",
                  description: "RESTful API for seamless integration into your systems.",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Verification in under 1 second. No waiting, no delays.",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-md transition-shadow group border hover:border-primary/50">
                    <CardHeader>
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-blue-500/20 w-fit group-hover:scale-110 transition-transform">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold"
              >
                Trusted Across Industries
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                From legal to logistics, healthcare to HR
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Scale, label: "Legal" },
                { icon: Building2, label: "Finance" },
                { icon: Briefcase, label: "HR" },
                { icon: Heart, label: "Healthcare" },
                { icon: Home, label: "Real Estate" },
                { icon: Truck, label: "Supply Chain" },
              ].map((industry, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center hover:shadow-lg transition-all group cursor-pointer border-2 hover:border-primary/50 h-full">
                    <CardContent className="pt-6 pb-6">
                      <div className="p-4 rounded-lg bg-primary/10 w-fit mx-auto group-hover:scale-110 transition-transform">
                        <industry.icon className="h-8 w-8 text-primary" />
                      </div>
                      <p className="mt-4 font-semibold">{industry.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.div
              variants={fadeInUp}
              className="p-4 rounded-full bg-primary/10 w-fit mx-auto"
            >
              <Lock className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold"
            >
              Security First
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Every attestation is protected with <strong>SHA-256 encryption</strong>, 
              the same standard used by governments and financial institutions worldwide. 
              Your documents are stored securely with Supabase, an enterprise-grade 
              open-source platform with SOC 2 Type 2 compliance.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              {[
                { label: "SHA-256 Hashing", value: "256-bit" },
                { label: "Data Encryption", value: "AES-256" },
                { label: "Uptime SLA", value: "99.9%" },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-lg bg-muted/50 border">
                  <div className="text-3xl font-bold text-primary">{item.value}</div>
                  <div className="text-sm text-muted-foreground mt-2">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold"
              >
                What People Say
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Attestia.io transformed how we handle contract verification. What used to take days now takes seconds.",
                  author: "Sarah Chen",
                  role: "Legal Director, TechCorp",
                },
                {
                  quote: "The simplicity is genius. Upload, attest, share. Our clients love the instant verification links.",
                  author: "Michael Rodriguez",
                  role: "CFO, FinanceHub",
                },
                {
                  quote: "Finally, a trust layer that works across industries. We use it for HR documents, vendor contracts, and compliance.",
                  author: "Priya Sharma",
                  role: "COO, GlobalLogistics",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full relative overflow-hidden border-2 hover:border-primary/50 hover:shadow-xl transition-all">
                    <div className="absolute top-4 right-4">
                      <Quote className="h-8 w-8 text-primary/20" />
                    </div>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground italic mb-4">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="border-t pt-4">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-12 text-center text-white"
          >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to Build Trust?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join thousands of organizations using Attestia.io to verify and share proof instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="text-lg px-8 h-12 bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 h-12 border-white text-white hover:bg-white/10"
                >
                  <Link href="/verify">Verify Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
