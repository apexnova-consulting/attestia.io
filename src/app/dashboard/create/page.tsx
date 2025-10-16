"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Upload, FileText, Loader2, CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { hashFile, generateSHA256Hash, generateAttestationId } from "@/lib/hash"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

interface AttestationData {
  id: string
  hash: string
  fileName: string
  timestamp: string
  link: string
}

export default function CreateAttestationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [textContent, setTextContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [attestationData, setAttestationData] = useState<AttestationData | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError("")
    }
  }

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      // Generate hash
      const fileHash = await hashFile(file)
      const attestationId = generateAttestationId()

      // Upload file to Supabase Storage
      const filePath = `${user.id}/${attestationId}/${file.name}`
      const { error: uploadError } = await supabase.storage
        .from("attestations")
        .upload(filePath, file)

      if (uploadError) {
        throw new Error("Failed to upload file: " + uploadError.message)
      }

      // Save attestation to database
      const { error: dbError } = await supabase
        .from("attestations")
        .insert({
          user_id: user.id,
          attestation_id: attestationId,
          file_name: file.name,
          file_hash: fileHash,
          file_type: file.type || "unknown",
          file_size: file.size,
          file_path: filePath,
        })

      if (dbError) {
        throw new Error("Failed to save attestation: " + dbError.message)
      }

      setAttestationData({
        id: attestationId,
        hash: fileHash,
        fileName: file.name,
        timestamp: new Date().toISOString(),
        link: `${window.location.origin}/verify?id=${attestationId}`,
      })
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleTextSubmit = async () => {
    if (!textContent.trim()) {
      setError("Please enter some text")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      // Generate hash
      const textHash = generateSHA256Hash(textContent)
      const attestationId = generateAttestationId()

      // Convert text to blob and upload
      const blob = new Blob([textContent], { type: "text/plain" })
      const fileName = `text-${Date.now()}.txt`
      const filePath = `${user.id}/${attestationId}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("attestations")
        .upload(filePath, blob)

      if (uploadError) {
        throw new Error("Failed to save text: " + uploadError.message)
      }

      // Save attestation to database
      const { error: dbError } = await supabase
        .from("attestations")
        .insert({
          user_id: user.id,
          attestation_id: attestationId,
          file_name: fileName,
          file_hash: textHash,
          file_type: "text/plain",
          file_size: blob.size,
          file_path: filePath,
        })

      if (dbError) {
        throw new Error("Failed to save attestation: " + dbError.message)
      }

      setAttestationData({
        id: attestationId,
        hash: textHash,
        fileName: fileName,
        timestamp: new Date().toISOString(),
        link: `${window.location.origin}/verify?id=${attestationId}`,
      })
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold mb-2">Create Attestation</h1>
            <p className="text-muted-foreground">
              Upload a document or paste text to create a cryptographic proof
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Choose Input Method</CardTitle>
              <CardDescription>
                Upload a file or paste text to generate a unique attestation
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
                    <Label htmlFor="file">Select File</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                      />
                      <label htmlFor="file" className="cursor-pointer">
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
                            <p className="font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              PDF, DOCX, PNG, JPG (max 10MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleFileUpload}
                    disabled={!file || loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Attestation...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Create Attestation
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="text" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="text">Text Content</Label>
                    <Textarea
                      id="text"
                      placeholder="Paste or type your text here..."
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      rows={10}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      {textContent.length} characters
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleTextSubmit}
                    disabled={!textContent.trim() || loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Attestation...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Create Attestation
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <p>
                  <strong className="text-foreground">Upload:</strong> Select a file or paste text
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <p>
                  <strong className="text-foreground">Hash:</strong> We generate a unique SHA-256
                  cryptographic hash
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <p>
                  <strong className="text-foreground">Store:</strong> Your file and hash are securely
                  stored
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  4
                </div>
                <p>
                  <strong className="text-foreground">Share:</strong> Get a unique verification link
                  and QR code
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Success Modal */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 p-3 rounded-full bg-green-500/10 w-fit">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-2xl text-center">Attestation Created!</DialogTitle>
            <DialogDescription className="text-center">
              Your document has been successfully attested
            </DialogDescription>
          </DialogHeader>

          {attestationData && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Attestation ID
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 text-sm bg-background px-3 py-2 rounded border">
                      {attestationData.id}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(attestationData.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    SHA-256 Hash
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 text-xs bg-background px-3 py-2 rounded border font-mono break-all">
                      {attestationData.hash}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(attestationData.hash)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">File Name</label>
                  <p className="mt-1 text-sm">{attestationData.fileName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                  <p className="mt-1 text-sm">{formatDate(attestationData.timestamp)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Verification Link
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      value={attestationData.link}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(attestationData.link)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/verify?id=${attestationData.id}`} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Attestation
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccess(false)
                    router.push("/dashboard")
                  }}
                  className="flex-1"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

