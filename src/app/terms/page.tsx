"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  FileText, 
  Scale, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react"

export default function TermsOfServicePage() {
  const lastUpdated = "January 1, 2024"

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing or using Attestia.io, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any of these terms, you are prohibited from using or accessing this service.",
        "These terms apply to all users of the service, including visitors, registered users, and API consumers.",
        "We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes."
      ]
    },
    {
      icon: Scale,
      title: "Service Description",
      content: [
        "Attestia.io provides cryptographic attestation and verification services for digital documents and content.",
        "Our service generates SHA-256 hashes of documents and stores verification records for future validation.",
        "We do not store your actual documents - only cryptographic hashes and metadata necessary for verification.",
        "The service is provided 'as is' and we make no warranties about the accuracy or completeness of verification results."
      ]
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      content: [
        "You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.",
        "You must provide accurate and complete information when creating your account and using our services.",
        "You are responsible for ensuring you have the right to attest and verify the documents you submit.",
        "You agree not to use the service for any illegal, fraudulent, or unauthorized purposes.",
        "You must comply with all applicable laws and regulations in your jurisdiction when using our service."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Uses",
      content: [
        "Attempting to reverse engineer, decompile, or disassemble any part of our service.",
        "Using automated systems to access the service in a manner that violates our rate limits or terms.",
        "Submitting malicious files, viruses, or other harmful content.",
        "Impersonating another person or entity or providing false information.",
        "Violating any intellectual property rights or privacy rights of others.",
        "Using the service to facilitate illegal activities or violate applicable laws."
      ]
    }
  ]

  const limitations = [
    "Service Availability: We strive for high availability but cannot guarantee uninterrupted service.",
    "Data Accuracy: While we use cryptographic methods, we cannot guarantee absolute accuracy of verification results.",
    "Third-Party Content: We are not responsible for the content of documents you submit for attestation.",
    "Security: While we implement strong security measures, no system is completely secure from all threats.",
    "Compliance: You are responsible for ensuring your use complies with applicable laws and regulations."
  ]

  const rights = [
    "Account Termination: We may suspend or terminate your account for violations of these terms.",
    "Service Modifications: We may modify, suspend, or discontinue any part of our service at any time.",
    "Content Removal: We may remove content that violates these terms or applicable laws.",
    "Access Restrictions: We may restrict access to our service for maintenance or security reasons.",
    "Legal Compliance: We may disclose information as required by law or legal process."
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Scale className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Terms of Service
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Service</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Please read these terms carefully before using Attestia.io. 
              These terms govern your use of our attestation and verification services.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Welcome to Attestia.io. These Terms of Service ("Terms") govern your use of our website, 
                services, and API (collectively, the "Service") operated by Attestia.io ("us", "we", or "our").
              </p>
              <p className="text-muted-foreground">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                with any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Limitations and Disclaimers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-orange-500" />
                  Service Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Our Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {rights.map((right, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{right}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Terms */}
          <div className="space-y-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The Service and its original content, features, and functionality are and will remain 
                  the exclusive property of Attestia.io and its licensors. The Service is protected by 
                  copyright, trademark, and other laws.
                </p>
                <p className="text-muted-foreground">
                  You retain ownership of the documents you submit for attestation. By using our service, 
                  you grant us a limited license to process your documents solely for the purpose of 
                  generating attestations and providing verification services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We offer both free and paid tiers of service. Paid subscriptions are billed in advance 
                  on a monthly or annual basis. All fees are non-refundable unless otherwise specified.
                </p>
                <p className="text-muted-foreground">
                  We reserve the right to change our pricing at any time. Changes will be communicated 
                  to users at least 30 days in advance and will take effect at the next billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You may terminate your account at any time by contacting us or using the account 
                  deletion feature in your dashboard. We may terminate or suspend your account 
                  immediately, without prior notice, for conduct that we believe violates these Terms.
                </p>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the Service will cease immediately. However, 
                  attestation records may be retained for verification purposes as described in our 
                  Privacy Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These Terms shall be interpreted and governed by the laws of the State of California, 
                  without regard to its conflict of law provisions.
                </p>
                <p className="text-muted-foreground">
                  Any disputes arising from these Terms or your use of the Service shall be resolved 
                  through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Questions About These Terms?</CardTitle>
              <CardDescription className="text-lg">
                Contact us if you have any questions about these Terms of Service
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@attestia.io</p>
                  <p><strong>Address:</strong> Attestia.io Legal Team, San Francisco, CA</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We will respond to all legal inquiries within 5 business days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-muted-foreground">
                What constitutes a material change will be determined at our sole discretion. By continuing 
                to access or use our Service after those revisions become effective, you agree to be bound 
                by the revised terms.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
