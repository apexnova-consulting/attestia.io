"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Copy, Download, Mail, MessageCircle, CheckCircle2, Loader2, Share2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { createClient } from "@/src/lib/supabase/client"
import { Navbar } from "@/src/components/navbar"
import Link from "next/link"
import QRCode from "react-qr-code"

export default function SharePage() {
  const params = useParams()
  const id = params?.id as string
  const [attestation, setAttestation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (id) {
      fetchAttestation()
    }
  }, [id])

  const fetchAttestation = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("attestations")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      router.push("/dashboard")
    } else {
      setAttestation(data)
    }
    setLoading(false)
  }

  const verificationUrl = attestation
    ? `${window.location.origin}/verify?id=${attestation.attestation_id}`
    : ""

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    const svg = document.getElementById("qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = `attestation-${attestation.attestation_id}-qr.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const shareViaEmail = () => {
    const subject = `Attestation Verification: ${attestation.file_name}`
    const body = `Please verify this attestation:\n\nFile: ${attestation.file_name}\nAttestation ID: ${attestation.attestation_id}\nVerification Link: ${verificationUrl}`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!attestation) {
    return null
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
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold mb-2">Share Attestation</h1>
            <p className="text-muted-foreground">
              Share this attestation with anyone via link or QR code
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attestation Details</CardTitle>
                  <CardDescription>
                    Information about this attestation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      File Name
                    </label>
                    <p className="mt-1 font-medium">{attestation.file_name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Attestation ID
                    </label>
                    <p className="mt-1 font-mono text-sm">
                      {attestation.attestation_id}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Created
                    </label>
                    <p className="mt-1 text-sm">{formatDate(attestation.created_at)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      SHA-256 Hash
                    </label>
                    <p className="mt-1 font-mono text-xs break-all bg-muted px-3 py-2 rounded">
                      {attestation.file_hash}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Link</CardTitle>
                  <CardDescription>
                    Share this link for instant verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={verificationUrl} readOnly className="font-mono text-sm" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(verificationUrl)}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button onClick={() => copyToClipboard(verificationUrl)} className="w-full">
                      {copied ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={shareViaEmail} className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Share via Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - QR Code */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                  <CardDescription>
                    Scan to verify instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center p-8 bg-white rounded-lg">
                    <QRCode
                      id="qr-code"
                      value={verificationUrl}
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox={`0 0 256 256`}
                    />
                  </div>

                  <Button onClick={downloadQR} variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">How to Share</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                      1
                    </div>
                    <p>
                      <strong className="text-foreground">Copy the link</strong> and share it via
                      email, messaging, or any platform
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                      2
                    </div>
                    <p>
                      <strong className="text-foreground">Download the QR code</strong> and include
                      it in documents, presentations, or print materials
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                      3
                    </div>
                    <p>
                      <strong className="text-foreground">Anyone can verify</strong> by scanning
                      the QR code or visiting the link - no account required
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href={verificationUrl} target="_blank">
                <Share2 className="mr-2 h-4 w-4" />
                View Verification Page
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

