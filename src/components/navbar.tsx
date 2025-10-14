"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, Menu } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isLanding = pathname === "/"

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Attestia.io
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLanding ? (
              <>
                <Link
                  href="#features"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="#industries"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Industries
                </Link>
                <Link
                  href="/verify"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Verify
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/verify"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/verify"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Verify
                </Link>
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isLanding ? (
              <>
                <Button variant="ghost" asChild className="hidden md:inline-flex">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="hidden md:inline-flex">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" asChild className="hidden md:inline-flex">
                <Link href="/">Home</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            {isLanding ? (
              <>
                <Link
                  href="#features"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="#industries"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Industries
                </Link>
                <Link
                  href="/verify"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Verify
                </Link>
                <div className="pt-2 space-y-2">
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/verify"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Verify
                </Link>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Home</Link>
                </Button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

