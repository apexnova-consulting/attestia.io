"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  BookOpen, 
  Code, 
  Key, 
  Database, 
  Shield, 
  Zap, 
  ExternalLink,
  Copy,
  CheckCircle2
} from "lucide-react"
import { useState } from "react"

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    listAttestations: `curl -X GET "https://your-app.vercel.app/api/v1/attestations" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`,
    
    verifyAttestation: `curl -X GET "https://your-app.vercel.app/api/v1/verify?hash=SHA256_HASH" \\
  -H "Content-Type: application/json"`,
    
    getUserProfile: `curl -X GET "https://your-app.vercel.app/api/v1/users/me" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                API v1
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Developer Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete API reference and integration guides for Attestia.io
            </p>
          </div>

          {/* Quick Start */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Start
              </CardTitle>
              <CardDescription>
                Get up and running with Attestia.io API in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">1</div>
                    <span className="font-semibold">Get API Key</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sign up and get your JWT token from the dashboard</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">2</div>
                    <span className="font-semibold">Make Request</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Use our RESTful endpoints with your authentication</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">3</div>
                    <span className="font-semibold">Verify Documents</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Integrate verification into your application</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* List Attestations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">GET</Badge>
                    <CardTitle>/api/v1/attestations</CardTitle>
                    <CardDescription>List all attestations for authenticated user</CardDescription>
                  </div>
                  <Database className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Headers</h4>
                  <div className="bg-muted p-3 rounded text-sm font-mono">
                    Authorization: Bearer YOUR_JWT_TOKEN
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Request</h4>
                  <div className="relative">
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      <code>{codeExamples.listAttestations}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.listAttestations, 'list')}
                    >
                      {copiedCode === 'list' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "attestation_id": "ATT-1234567890-ABCD1234",
      "file_name": "document.pdf",
      "file_hash": "sha256_hash",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 1
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Verify Attestation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">GET</Badge>
                    <CardTitle>/api/v1/verify</CardTitle>
                    <CardDescription>Verify an attestation by hash or ID</CardDescription>
                  </div>
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Query Parameters</h4>
                  <div className="space-y-2 text-sm">
                    <div><code className="bg-muted px-2 py-1 rounded">hash</code> - SHA-256 hash of the document</div>
                    <div><code className="bg-muted px-2 py-1 rounded">id</code> - Attestation ID (alternative to hash)</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Request</h4>
                  <div className="relative">
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      <code>{codeExamples.verifyAttestation}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.verifyAttestation, 'verify')}
                    >
                      {copiedCode === 'verify' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "verified": true,
  "data": {
    "attestation_id": "ATT-1234567890-ABCD1234",
    "file_name": "document.pdf",
    "file_hash": "sha256_hash",
    "created_at": "2024-01-01T00:00:00Z"
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Get User Profile */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">GET</Badge>
                    <CardTitle>/api/v1/users/me</CardTitle>
                    <CardDescription>Get current user profile and statistics</CardDescription>
                  </div>
                  <Key className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Headers</h4>
                  <div className="bg-muted p-3 rounded text-sm font-mono">
                    Authorization: Bearer YOUR_JWT_TOKEN
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example Request</h4>
                  <div className="relative">
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      <code>{codeExamples.getUserProfile}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.getUserProfile, 'user')}
                    >
                      {copiedCode === 'user' ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "user_uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z",
    "attestation_count": 5
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Authentication</CardTitle>
                    <CardDescription>How to authenticate with the API</CardDescription>
                  </div>
                  <Key className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">JWT Tokens</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Attestia.io uses JWT tokens for API authentication. Get your token from the dashboard after signing in.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Rate Limits</h4>
                  <div className="space-y-2 text-sm">
                    <div>• <strong>Free Tier:</strong> 100 requests/hour</div>
                    <div>• <strong>Pro Tier:</strong> 1,000 requests/hour</div>
                    <div>• <strong>Enterprise:</strong> Custom limits</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Error Codes</h4>
                  <div className="space-y-2 text-sm">
                    <div><code className="bg-muted px-2 py-1 rounded">401</code> - Unauthorized</div>
                    <div><code className="bg-muted px-2 py-1 rounded">400</code> - Bad Request</div>
                    <div><code className="bg-muted px-2 py-1 rounded">404</code> - Not Found</div>
                    <div><code className="bg-muted px-2 py-1 rounded">429</code> - Rate Limited</div>
                    <div><code className="bg-muted px-2 py-1 rounded">500</code> - Server Error</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SDKs and Libraries */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                SDKs & Libraries
              </CardTitle>
              <CardDescription>
                Official and community-maintained libraries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">JavaScript/TypeScript</h4>
                  <p className="text-sm text-muted-foreground mb-3">Official SDK for Node.js and browsers</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="https://github.com/Attestia-io/attestia-js" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Python</h4>
                  <p className="text-sm text-muted-foreground mb-3">Community-maintained Python SDK</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="https://github.com/Attestia-io/attestia-python" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">React Hook</h4>
                  <p className="text-sm text-muted-foreground mb-3">React hook for easy integration</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="https://github.com/Attestia-io/attestia-react" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integration Guides */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Integration Guides</CardTitle>
              <CardDescription>
                Step-by-step guides for common integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Document Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn how to integrate document verification into your application workflow.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/docs/verification-guide">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read Guide
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Webhook Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up webhooks to receive real-time notifications about attestation events.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/docs/webhook-guide">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read Guide
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Batch Operations</h4>
                  <p className="text-sm text-muted-foreground">
                    Process multiple documents efficiently with batch attestation endpoints.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/docs/batch-guide">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read Guide
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Security Best Practices</h4>
                  <p className="text-sm text-muted-foreground">
                    Implement secure authentication and data handling in your integration.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/docs/security-guide">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read Guide
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Get support from our developer community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" asChild>
                  <Link href="mailto:dev@attestia.io">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Email Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/Attestia-io/attestia.io/discussions" target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    GitHub Discussions
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Contact Form
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