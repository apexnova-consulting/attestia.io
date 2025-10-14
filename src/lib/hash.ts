import crypto from 'crypto'

export function generateSHA256Hash(data: string | Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

export function generateAttestationId(): string {
  return `ATT-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
}

export async function hashFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return generateSHA256Hash(buffer)
}

