import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

// GET /api/v1/verify?hash=xxx or /api/v1/verify?id=xxx - Verify attestation
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const hash = searchParams.get('hash')
    const id = searchParams.get('id')

    if (!hash && !id) {
      return NextResponse.json(
        { error: 'Missing hash or id parameter' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    let query = supabase.from('attestations').select('*')

    if (hash) {
      query = query.eq('file_hash', hash)
    } else if (id) {
      query = query.eq('attestation_id', id)
    }

    const { data, error } = await query.single()

    if (error || !data) {
      return NextResponse.json({
        success: false,
        verified: false,
        message: 'No matching attestation found'
      })
    }

    return NextResponse.json({
      success: true,
      verified: true,
      data: {
        attestation_id: data.attestation_id,
        file_name: data.file_name,
        file_hash: data.file_hash,
        file_type: data.file_type,
        created_at: data.created_at
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

