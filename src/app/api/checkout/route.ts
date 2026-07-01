import { NextResponse } from 'next/server'
import { TIP_AMOUNTS } from '@/lib/content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ALLOWED_AMOUNTS = new Set<number>(TIP_AMOUNTS as readonly number[])

export async function POST(req: Request) {
  let payload: { amount?: number; successUrl?: string; cancelUrl?: string }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const amount = Number(payload.amount)
  if (!ALLOWED_AMOUNTS.has(amount)) {
    return NextResponse.json({ error: 'Montant invalide.' }, { status: 400 })
  }

  // Les URLs de redirection viennent de l'origine de la requête (jamais du body du client),
  // pour éviter qu'un tiers ne fasse rediriger la session Stripe vers un domaine arbitraire.
  const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || ''
  const successUrl = `${origin}/merci-cafe`
  const cancelUrl = `${origin}/#offrir-un-cafe`

  const webhookUrl =
    process.env.N8N_CHECKOUT_WEBHOOK_URL ||
    'https://n8n.maikagency.dev/webhook/bmc-checkout'

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'eur', successUrl, cancelUrl }),
      signal: AbortSignal.timeout(20000),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok || !data?.url) {
      console.error('Webhook n8n (checkout) a répondu', res.status)
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessaie dans un instant." },
        { status: 502 }
      )
    }

    return NextResponse.json({ url: data.url })
  } catch (err) {
    console.error('Erreur appel webhook n8n (checkout)', err)
    return NextResponse.json(
      { error: 'Le service est momentanément indisponible. Réessaie dans un instant.' },
      { status: 502 }
    )
  }
}
