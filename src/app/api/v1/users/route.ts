import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

// GET /api/v1/users/me - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get attestation count for user
    const { count } = await supabase
      .from('attestations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name,
        created_at: user.created_at,
        attestation_count: count || 0
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

