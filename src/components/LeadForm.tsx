'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ChevronDown, Loader2, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
import { PROFILES, type ProfileValue } from '@/lib/content'
import { isValidEmail, cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function LeadForm() {
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState<ProfileValue | ''>('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [touchedEmail, setTouchedEmail] = useState(false)

  // Le bouton ne s'active que si email valide ET profil choisi
  const emailValid = useMemo(() => isValidEmail(email), [email])
  const isValid = emailValid && profile !== ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || status === 'loading') return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), profile }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Une erreur est survenue. Réessaie dans un instant.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass glow-border rounded-2xl p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-neon-orange mb-5 shadow-glow-md">
          <CheckCircle2 className="w-9 h-9 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">C&apos;est parti&nbsp;! 🚀</h3>
        <p className="text-dark-300 leading-relaxed">
          Ton ebook arrive dans ta boîte mail&nbsp;
          <span className="text-accent-400 font-medium">({email})</span>.
          <br />
          Pense à vérifier tes spams si tu ne le vois pas d&apos;ici 2 minutes.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass glow-border rounded-2xl p-6 sm:p-8 space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-dark-200">
          Ton adresse email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400 pointer-events-none" />
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="prenom@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouchedEmail(true)}
            className={cn(
              'w-full rounded-xl bg-dark-900/70 border pl-12 pr-4 py-3.5 text-white placeholder:text-dark-500',
              'focus:outline-none focus:ring-2 transition-all duration-200',
              touchedEmail && email && !emailValid
                ? 'border-red-500/60 focus:ring-red-500/40'
                : 'border-white/10 focus:border-accent-500 focus:ring-accent-500/30'
            )}
            aria-invalid={touchedEmail && !!email && !emailValid}
          />
        </div>
        {touchedEmail && email && !emailValid && (
          <p className="text-xs text-red-400">Entre une adresse email valide.</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="profile" className="block text-sm font-medium text-dark-200">
          Ton profil
        </label>
        <div className="relative">
          <select
            id="profile"
            value={profile}
            onChange={(e) => setProfile(e.target.value as ProfileValue)}
            className={cn(
              'w-full appearance-none rounded-xl bg-dark-900/70 border border-white/10 px-4 py-3.5 pr-11',
              'font-mono text-sm focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 transition-all duration-200',
              profile === '' ? 'text-dark-500' : 'text-white'
            )}
          >
            <option value="" disabled>
              &gt; choisissez votre profil
            </option>
            {PROFILES.map((p) => (
              <option key={p.value} value={p.value} className="text-white bg-dark-900">
                {p.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400 pointer-events-none" />
        </div>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={!isValid || status === 'loading'}
        className={cn(
          'group w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all duration-300',
          isValid && status !== 'loading'
            ? 'bg-gradient-to-r from-accent-500 to-neon-orange text-white shadow-glow-sm hover:shadow-glow-md hover:-translate-y-0.5 cursor-pointer'
            : 'bg-dark-800 text-dark-500 cursor-not-allowed'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            Recevoir l&apos;ebook
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-dark-500">
        Reçois-le gratuitement par email. Zéro spam, désinscription en un clic.
      </p>
    </form>
  )
}
