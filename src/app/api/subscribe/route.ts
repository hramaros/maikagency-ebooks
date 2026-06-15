import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PROFILE_LABELS: Record<string, string> = {
  etudiant: 'Étudiant',
  professionnel: 'Professionnel',
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  let payload: { email?: string; profile?: string }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const email = (payload.email || '').trim()
  const profile = (payload.profile || '').trim()

  // Validation serveur (le bouton ne s'active que si valide côté client, on revalide ici)
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
  }
  if (!PROFILE_LABELS[profile]) {
    return NextResponse.json({ error: 'Profil invalide.' }, { status: 400 })
  }

  // Webhook n8n public (non sensible) : valeur par défaut surchargeable via env.
  const webhookUrl =
    process.env.N8N_WEBHOOK_URL ||
    'https://n8n.maikagency.dev/webhook/ebook-prompt-engineering'

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        profile,
        profileLabel: PROFILE_LABELS[profile],
        source: 'landing-ebook-prompt-engineering',
        submittedAt: new Date().toISOString(),
      }),
      // Évite de bloquer trop longtemps si n8n est lent
      signal: AbortSignal.timeout(20000),
    })

    if (!res.ok) {
      console.error('Webhook n8n a répondu', res.status)
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessaie dans un instant." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Erreur appel webhook n8n', err)
    return NextResponse.json(
      { error: "Le service est momentanément indisponible. Réessaie dans un instant." },
      { status: 502 }
    )
  }
}
