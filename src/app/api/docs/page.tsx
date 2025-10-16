import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Badge className="mb-4">Coming Soon</Badge>
            <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
            <p className="text-muted-foreground text-lg">
              RESTful API for developers to integrate Attestia.io into their applications
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Endpoints</CardTitle>
                <CardDescription>
                  The following API endpoints are currently available for testing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">GET</Badge>
                    <code className="text-sm">/api/v1/attestations</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    List all attestations for the authenticated user
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">GET</Badge>
                    <code className="text-sm">/api/v1/verify?hash=xxx</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Verify an attestation by file hash or attestation ID
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">GET</Badge>
                    <code className="text-sm">/api/v1/users/me</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get current authenticated user profile and statistics
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Future Features</CardTitle>
                <CardDescription>
                  These features will be available in upcoming releases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Planned</Badge>
                  <span className="text-sm">POST /api/v1/attestations - Create attestations via API</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Planned</Badge>
                  <span className="text-sm">API Key Management Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Planned</Badge>
                  <span className="text-sm">Webhook Support for Verification Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Planned</Badge>
                  <span className="text-sm">Batch Attestation Operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Planned</Badge>
                  <span className="text-sm">OpenAPI/Swagger Documentation</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  API authentication will use JWT tokens from Supabase Auth. Full documentation
                  and API key management will be available in the next release.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

