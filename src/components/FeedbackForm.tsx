'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Mail, Loader2, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
import { FEEDBACK } from '@/lib/content'
import { isValidEmail, cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [touchedEmail, setTouchedEmail] = useState(false)

  const emailValid = isValidEmail(email)
  const isValid = rating > 0 && comment.trim().length > 0 && emailValid

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || status === 'loading') return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment: comment.trim(), email: email.trim() }),
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
        id="feedback"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass glow-border rounded-2xl p-5 sm:p-6 h-full flex flex-col items-center justify-center text-center"
        role="status"
        aria-live="polite"
      >
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500 to-neon-orange mb-4 shadow-glow-sm">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold mb-1">Merci pour ton avis&nbsp;! 🙏</h3>
        <p className="text-sm text-dark-300 leading-relaxed">Ton retour a bien été enregistré.</p>
      </motion.div>
    )
  }

  return (
    <form
      id="feedback"
      onSubmit={handleSubmit}
      className="glass glow-border rounded-2xl p-5 sm:p-6 h-full flex flex-col"
      noValidate
    >
      <h3 className="text-lg font-bold mb-1">{FEEDBACK.title}</h3>
      <p className="text-sm text-dark-300 leading-relaxed mb-4">{FEEDBACK.subtitle}</p>

      <div className="flex items-center gap-1 mb-3" role="radiogroup" aria-label="Note sur 5">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-0.5 cursor-pointer"
          >
            <Star
              className={cn(
                'w-6 h-6 transition-colors duration-150',
                (hoverRating || rating) >= value
                  ? 'fill-accent-400 text-accent-400'
                  : 'text-dark-500'
              )}
            />
          </button>
        ))}
      </div>

      <textarea
        rows={2}
        placeholder="Ton commentaire…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full rounded-xl bg-dark-900/70 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 transition-all duration-200 resize-none mb-3"
      />

      <div className="relative mb-3">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouchedEmail(true)}
          className={cn(
            'w-full rounded-xl bg-dark-900/70 border pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-dark-500',
            'focus:outline-none focus:ring-2 transition-all duration-200',
            touchedEmail && email && !emailValid
              ? 'border-red-500/60 focus:ring-red-500/40'
              : 'border-white/10 focus:border-accent-500 focus:ring-accent-500/30'
          )}
          aria-invalid={touchedEmail && !!email && !emailValid}
        />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 mb-3"
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
          'mt-auto group w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300',
          isValid && status !== 'loading'
            ? 'bg-gradient-to-r from-accent-500 to-neon-orange text-white shadow-glow-sm hover:shadow-glow-md hover:-translate-y-0.5 cursor-pointer'
            : 'bg-dark-800 text-dark-500 cursor-not-allowed'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer mon avis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>
    </form>
  )
}
