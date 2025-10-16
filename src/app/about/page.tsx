"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  Shield, 
  Globe, 
  Zap, 
  Users, 
  Target,
  Award,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every attestation is cryptographically secured with SHA-256 hashing, ensuring tamper-proof verification."
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Built for global scale, supporting any document type across industries and jurisdictions."
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Verify documents in milliseconds without blockchain delays or central authority bottlenecks."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Designed with simplicity in mind, making complex cryptographic verification accessible to everyone."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Documents Attested" },
    { number: "50+", label: "Countries Served" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" }
  ]

  const team = [
    {
      name: "Mike Nielsen",
      role: "Founder & CEO",
      description: "Former blockchain engineer with 10+ years building trust systems for Fortune 500 companies.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Cryptography expert and open-source contributor, previously at Google and Microsoft.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "David Rodriguez",
      role: "Head of Product",
      description: "Product strategist with experience scaling SaaS platforms from startup to enterprise.",
      image: "/api/placeholder/150/150"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                About Us
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Building the Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Digital Trust</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Attestia.io is revolutionizing how organizations prove, verify, and share trust in digital transactions. 
              We're creating a universal trust layer that works across any industry, without blockchain complexity or central authority dependency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>

          {/* Mission Statement */}
          <Card className="mb-16 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
              <CardDescription className="text-lg">
                To democratize digital trust by making cryptographic verification accessible, 
                instant, and universally applicable across all industries and use cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">The Problem We Solve</h3>
                  <p className="text-muted-foreground mb-4">
                    In today's digital world, proving authenticity and preventing fraud is increasingly complex. 
                    Traditional methods are slow, expensive, and often require specialized knowledge or infrastructure.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-red-500" />
                      Blockchain solutions are slow and expensive
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-red-500" />
                      Central authorities create single points of failure
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-red-500" />
                      Complex verification processes slow down business
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Our Solution</h3>
                  <p className="text-muted-foreground mb-4">
                    Attestia.io provides instant, cryptographic verification that works anywhere, 
                    anytime, without blockchain complexity or central authority dependency.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Instant verification in milliseconds
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      No blockchain or central authority required
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Simple API integration for any application
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These core principles guide everything we do at Attestia.io
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16">
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-4">By the Numbers</CardTitle>
                <CardDescription className="text-lg">
                  Our impact in building digital trust worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The passionate individuals building the future of digital trust
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto w-24 h-24 rounded-full bg-muted mb-4 flex items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <Badge variant="outline" className="w-fit mx-auto">{member.role}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Ready to Join Us?</CardTitle>
              <CardDescription className="text-lg">
                Be part of the digital trust revolution. Start verifying documents today.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Schedule Demo
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
