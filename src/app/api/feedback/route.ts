import { NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/utils'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_COMMENT_LENGTH = 2000

export async function POST(req: Request) {
  let payload: { rating?: number; comment?: string; email?: string }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const rating = Number.parseInt(String(payload.rating ?? ''), 10)
  const comment = (payload.comment || '').trim()
  const email = (payload.email || '').trim()

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Note invalide.' }, { status: 400 })
  }
  if (!comment || comment.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json({ error: 'Commentaire invalide.' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
  }

  const webhookUrl =
    process.env.N8N_FEEDBACK_WEBHOOK_URL ||
    'https://n8n.maikagency.dev/webhook/ebook-feedback'

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating,
        comment,
        email,
        source: 'landing-ebook-prompt-engineering',
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(20000),
    })

    if (!res.ok) {
      console.error('Webhook n8n (feedback) a répondu', res.status)
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessaie dans un instant." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Erreur appel webhook n8n (feedback)', err)
    return NextResponse.json(
      { error: 'Le service est momentanément indisponible. Réessaie dans un instant.' },
      { status: 502 }
    )
  }
}
