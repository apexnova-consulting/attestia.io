"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  FileCheck,
  Calendar,
  Hash,
  ExternalLink,
  LogOut,
  User,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"

interface Attestation {
  id: string
  attestation_id: string
  file_name: string
  file_hash: string
  created_at: string
  file_type: string
  file_size: number
}

interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [attestations, setAttestations] = useState<Attestation[]>([])
  const [filteredAttestations, setFilteredAttestations] = useState<Attestation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const router = useRouter()
  const supabase = createClient()

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push("/login")
    } else {
      setUser(user)
    }
  }, [supabase.auth, router])

  const fetchAttestations = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("attestations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching attestations:", error)
    } else {
      setAttestations(data || [])
    }
    setLoading(false)
  }, [supabase])

  const filterAttestations = useCallback(() => {
    let filtered = [...attestations]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (att) =>
          att.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          att.attestation_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          att.file_hash.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((att) => att.file_type === filterType)
    }

    setFilteredAttestations(filtered)
  }, [attestations, searchQuery, filterType])

  useEffect(() => {
    checkUser()
    fetchAttestations()
  }, [checkUser, fetchAttestations])

  useEffect(() => {
    filterAttestations()
  }, [filterAttestations])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const uniqueFileTypes = Array.from(new Set(attestations.map((a) => a.file_type)))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="border-b bg-muted/30 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your attestations and verifications
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.user_metadata?.full_name
                          ? getInitials(user.user_metadata.full_name)
                          : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.user_metadata?.full_name || "User"}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Attestations</CardDescription>
                <CardTitle className="text-3xl">{attestations.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-3xl">
                  {
                    attestations.filter(
                      (a) =>
                        new Date(a.created_at).getMonth() === new Date().getMonth()
                    ).length
                  }
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Storage</CardDescription>
                <CardTitle className="text-3xl">
                  {formatFileSize(
                    attestations.reduce((acc, a) => acc + (a.file_size || 0), 0)
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search attestations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  {filterType !== "all" && (
                    <Badge variant="secondary" className="ml-2">
                      1
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>File Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterType("all")}>
                  All Types
                </DropdownMenuItem>
                {uniqueFileTypes.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link href="/dashboard/create">
                <Plus className="mr-2 h-4 w-4" />
                New Attestation
              </Link>
            </Button>
          </div>
        </div>

        {/* Attestations List */}
        {filteredAttestations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex p-4 rounded-full bg-muted mb-4">
              <FileCheck className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No attestations found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first attestation to get started"}
            </p>
            {!searchQuery && filterType === "all" && (
              <Button asChild>
                <Link href="/dashboard/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Attestation
                </Link>
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredAttestations.map((attestation, index) => (
              <motion.div
                key={attestation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {attestation.file_name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Badge variant="outline">{attestation.file_type}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatFileSize(attestation.file_size)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Hash className="h-4 w-4" />
                            <span className="font-mono text-xs">
                              {attestation.file_hash.slice(0, 16)}...
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {formatDate(attestation.created_at)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {attestation.attestation_id}
                          </code>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                          <Link
                            href={`/verify?id=${attestation.attestation_id}`}
                            target="_blank"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                          <Link href={`/dashboard/share/${attestation.id}`}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Share
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

