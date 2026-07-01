import Link from 'next/link'
import { Coffee, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Merci pour ton café ! — Maikagency',
}

export default function MerciCafePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4">
      <div className="glass glow-border rounded-2xl p-8 sm:p-10 max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-neon-orange mb-5 shadow-glow-md">
          <Coffee className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Merci pour ton café&nbsp;! ☕️</h1>
        <p className="text-dark-300 leading-relaxed mb-6">
          Ton soutien compte énormément et nous aide à continuer à créer du contenu gratuit. Un
          email de confirmation arrive dans ta boîte mail.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold bg-gradient-to-r from-accent-500 to-neon-orange text-white shadow-glow-sm hover:shadow-glow-md hover:-translate-y-0.5 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  )
}
