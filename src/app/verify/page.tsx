"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Upload,
  CheckCircle2,
  XCircle,
  Loader2,
  Hash,
  FileText,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { hashFile, generateSHA256Hash } from "@/lib/hash"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

interface VerificationResult {
  verified: boolean
  hash: string
  data?: {
    attestation_id: string
    file_name: string
    file_hash: string
    file_type: string
    created_at: string
  }
}

interface LookupResult {
  found: boolean
  data?: {
    attestation_id: string
    file_name: string
    file_hash: string
    file_type: string
    created_at: string
  }
}

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const attestationId = searchParams?.get("id")

  const [file, setFile] = useState<File | null>(null)
  const [textContent, setTextContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState("")
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null)

  const supabase = createClient()

  const lookupAttestation = useCallback(async (id: string) => {
    setLookupLoading(true)
    const { data, error } = await supabase
      .from("attestations")
      .select("*")
      .eq("attestation_id", id)
      .single()

    if (error || !data) {
      setLookupResult({ found: false })
    } else {
      setLookupResult({ found: true, data })
    }
    setLookupLoading(false)
  }, [supabase])

  useEffect(() => {
    if (attestationId) {
      lookupAttestation(attestationId)
    }
  }, [attestationId, lookupAttestation])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError("")
      setVerificationResult(null)
    }
  }

  const handleFileVerify = async () => {
    if (!file) {
      setError("Please select a file")
      return
    }

    setLoading(true)
    setError("")
    setVerificationResult(null)

    try {
      const fileHash = await hashFile(file)

      const { data, error: dbError } = await supabase
        .from("attestations")
        .select("*")
        .eq("file_hash", fileHash)
        .single()

      if (dbError || !data) {
        setVerificationResult({
          verified: false,
          hash: fileHash,
        })
      } else {
        setVerificationResult({
          verified: true,
          hash: fileHash,
          data,
        })
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleTextVerify = async () => {
    if (!textContent.trim()) {
      setError("Please enter some text")
      return
    }

    setLoading(true)
    setError("")
    setVerificationResult(null)

    try {
      const textHash = generateSHA256Hash(textContent)

      const { data, error: dbError } = await supabase
        .from("attestations")
        .select("*")
        .eq("file_hash", textHash)
        .single()

      if (dbError || !data) {
        setVerificationResult({
          verified: false,
          hash: textHash,
        })
      } else {
        setVerificationResult({
          verified: true,
          hash: textHash,
          data,
        })
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Verify Document
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload a document or paste text to verify its authenticity and check if it exists in our system
            </p>
          </div>

          {/* Lookup Result (if ID provided) */}
          {attestationId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              {lookupLoading ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </CardContent>
                </Card>
              ) : lookupResult?.found ? (
                <Card className="border-green-500/50 bg-green-500/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <CardTitle className="text-green-600 dark:text-green-400">
                          Attestation Found
                        </CardTitle>
                        <CardDescription>
                          This attestation exists in our system
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Attestation ID
                        </label>
                        <p className="font-mono text-sm mt-1">
                          {lookupResult.data.attestation_id}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          File Name
                        </label>
                        <p className="text-sm mt-1">{lookupResult.data.file_name}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          SHA-256 Hash
                        </label>
                        <p className="font-mono text-xs mt-1 break-all bg-background px-3 py-2 rounded border">
                          {lookupResult.data.file_hash}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Created
                        </label>
                        <p className="text-sm mt-1">
                          {formatDate(lookupResult.data.created_at)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          File Type
                        </label>
                        <Badge variant="outline" className="mt-1">
                          {lookupResult.data.file_type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-destructive/10">
                        <XCircle className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <CardTitle className="text-destructive">
                          Attestation Not Found
                        </CardTitle>
                        <CardDescription>
                          No attestation found with ID: {attestationId}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )}
            </motion.div>
          )}

          {/* Verification Form */}
          <Card>
            <CardHeader>
              <CardTitle>Verify by Content</CardTitle>
              <CardDescription>
                Upload a file or paste text to check if it matches any existing attestation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file">Upload File</TabsTrigger>
                  <TabsTrigger value="text">Paste Text</TabsTrigger>
                </TabsList>

                <TabsContent value="file" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="verify-file">Select File</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <input
                        id="verify-file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="verify-file" className="cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        {file ? (
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">Click to upload</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Any file type supported
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleFileVerify}
                    disabled={!file || loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Verify File
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="text" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="verify-text">Text Content</Label>
                    <Textarea
                      id="verify-text"
                      placeholder="Paste your text here..."
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  <Button
                    onClick={handleTextVerify}
                    disabled={!textContent.trim() || loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Verify Text
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>

              {error && (
                <div className="mt-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Verification Result */}
              {verificationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  {verificationResult.verified ? (
                    <Card className="border-green-500/50 bg-green-500/5">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-500/10">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                          </div>
                          <div>
                            <CardTitle className="text-green-600 dark:text-green-400 text-2xl">
                              ✓ Verified
                            </CardTitle>
                            <CardDescription>
                              This document has been attested and exists in our system
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            SHA-256 Hash
                          </label>
                          <p className="font-mono text-xs mt-1 break-all bg-background px-3 py-2 rounded border">
                            {verificationResult.hash}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              File Name
                            </label>
                            <p className="text-sm mt-1">
                              {verificationResult.data.file_name}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Created
                            </label>
                            <p className="text-sm mt-1">
                              {formatDate(verificationResult.data.created_at)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-destructive/50 bg-destructive/5">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-destructive/10">
                            <XCircle className="h-8 w-8 text-destructive" />
                          </div>
                          <div>
                            <CardTitle className="text-destructive text-2xl">
                              ✗ Not Found
                            </CardTitle>
                            <CardDescription>
                              This document does not match any attestation in our system
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Computed Hash
                          </label>
                          <p className="font-mono text-xs mt-1 break-all bg-background px-3 py-2 rounded border">
                            {verificationResult.hash}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          This document has not been attested. Would you like to{" "}
                          <Link href="/dashboard/create" className="text-primary hover:underline">
                            create an attestation
                          </Link>
                          ?
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="mt-6 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">How Verification Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <Hash className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <p>
                  We generate a unique SHA-256 hash of your document and compare it with our database
                </p>
              </div>
              <div className="flex gap-3">
                <Shield className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <p>
                  If a match is found, we return the attestation details including creation timestamp
                </p>
              </div>
              <div className="flex gap-3">
                <FileText className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <p>
                  Your document is never uploaded - we only verify its cryptographic signature
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

