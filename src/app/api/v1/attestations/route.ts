import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/v1/attestations - List all attestations for authenticated user
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('attestations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch attestations' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/v1/attestations - Create new attestation (Future: API-based creation)
export async function POST() {
  return NextResponse.json(
    {
      error: 'Not implemented',
      message: 'This endpoint is reserved for future API access. Use the dashboard to create attestations.'
    },
    { status: 501 }
  )
}

