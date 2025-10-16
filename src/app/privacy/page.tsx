"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  Shield, 
  Eye, 
  Lock, 
  Database,
  Users,
  FileText
} from "lucide-react"

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 1, 2024"

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        "Account Information: Name, email address, and profile details you provide during registration.",
        "Document Metadata: File names, types, sizes, and cryptographic hashes of documents you attest.",
        "Usage Data: Information about how you interact with our service, including API calls and verification requests.",
        "Technical Data: IP addresses, browser information, and device identifiers for security and analytics purposes."
      ]
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "Service Provision: To provide, maintain, and improve our attestation and verification services.",
        "Authentication: To verify your identity and manage your account access.",
        "Security: To protect against fraud, abuse, and unauthorized access to our systems.",
        "Communication: To send you important updates about our service and respond to your inquiries.",
        "Analytics: To understand usage patterns and improve our platform's performance and features."
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Encryption: All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.",
        "Cryptographic Hashing: Documents are processed using SHA-256 hashing - we never store your actual documents.",
        "Access Controls: Strict access controls ensure only authorized personnel can access your data.",
        "Regular Audits: We conduct regular security audits and penetration testing to maintain the highest security standards.",
        "Infrastructure Security: Our infrastructure is hosted on enterprise-grade cloud platforms with SOC 2 compliance."
      ]
    },
    {
      icon: Users,
      title: "Data Sharing",
      content: [
        "No Document Sharing: We never share your actual documents with third parties - only cryptographic hashes.",
        "Service Providers: We may share data with trusted service providers who help us operate our platform.",
        "Legal Requirements: We may disclose information if required by law or to protect our rights and users.",
        "Business Transfers: In the event of a merger or acquisition, your data may be transferred to the new entity.",
        "Consent: We will not share your personal information for marketing purposes without your explicit consent."
      ]
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: [
        "Access: You can request a copy of all personal data we have about you.",
        "Correction: You can update or correct your personal information at any time through your account settings.",
        "Deletion: You can request deletion of your account and associated data, subject to legal and operational requirements.",
        "Portability: You can export your attestation data in a machine-readable format.",
        "Objection: You can object to certain processing of your personal data, such as marketing communications."
      ]
    }
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
              <Shield className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Privacy Policy
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Your privacy is fundamental to our mission of building trust. 
              This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Our Commitment to Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                At Attestia.io, we believe that privacy and security are not just features—they're fundamental requirements 
                for building trust in digital transactions. This Privacy Policy explains how we collect, use, disclose, 
                and protect your information when you use our attestation and verification services.
              </p>
              <p className="text-muted-foreground">
                We are committed to transparency about our data practices and giving you control over your personal information. 
                This policy applies to all users of our platform, whether you're verifying documents or building integrations 
                with our API.
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

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  We use essential cookies to maintain your session and provide core functionality. 
                  We also use analytics cookies to understand how our service is used and improve performance.
                </p>
                <p className="text-muted-foreground">
                  You can control cookie preferences through your browser settings. 
                  Note that disabling certain cookies may affect the functionality of our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  We retain your personal information for as long as necessary to provide our services 
                  and comply with legal obligations.
                </p>
                <p className="text-muted-foreground">
                  Attestation records are retained indefinitely as they serve as permanent proof of document integrity. 
                  You can request deletion of your account data at any time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Your data may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place for such transfers.
                </p>
                <p className="text-muted-foreground">
                  We comply with applicable data protection laws, including GDPR for EU users 
                  and CCPA for California residents.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Our service is not intended for children under 13 years of age. 
                  We do not knowingly collect personal information from children under 13.
                </p>
                <p className="text-muted-foreground">
                  If we become aware that we have collected personal information from a child under 13, 
                  we will take steps to delete such information promptly.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Questions About Privacy?</CardTitle>
              <CardDescription className="text-lg">
                We're here to help with any privacy-related questions or concerns
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy or our data practices, 
                  please contact our Privacy Team:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@attestia.io</p>
                  <p><strong>Address:</strong> Attestia.io Privacy Team, San Francisco, CA</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We will respond to all privacy inquiries within 30 days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or applicable laws. When we make significant changes, we will:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Notify you via email or through our service</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Update the "Last updated" date at the top of this policy</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Provide a summary of the key changes</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
