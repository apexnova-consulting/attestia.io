import Link from "next/link"
import { Shield, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-6 w-6 text-primary" />
                <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Attestia.io
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The Trust Layer for Global Transactions
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@attestia.io"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/verify"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Verify Document
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="font-semibold mb-4">Developers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/api/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Developer Docs
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Attestia-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Status
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Attestia.io. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

