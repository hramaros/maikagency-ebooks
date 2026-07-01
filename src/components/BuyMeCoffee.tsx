'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Loader2, AlertCircle } from 'lucide-react'
import { COFFEE, TIP_AMOUNTS } from '@/lib/content'
import { cn } from '@/lib/utils'

export default function BuyMeCoffee() {
  const [loadingAmount, setLoadingAmount] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleTip(amount: number) {
    if (loadingAmount !== null) return
    setLoadingAmount(amount)
    setErrorMsg('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Une erreur est survenue. Réessaie dans un instant.')
      }

      window.location.href = data.url
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoadingAmount(null)
    }
  }

  return (
    <div id="offrir-un-cafe" className="glass glow-border rounded-2xl p-5 sm:p-6 h-full flex flex-col">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500 to-neon-orange mb-4 shadow-glow-sm shrink-0">
        <Coffee className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-bold mb-1">{COFFEE.title}</h3>
      <p className="text-sm text-dark-300 leading-relaxed mb-4">{COFFEE.subtitle}</p>

      <div className="mt-auto flex flex-wrap gap-2.5">
        {TIP_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => handleTip(amount)}
            disabled={loadingAmount !== null}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold border transition-all duration-200',
              loadingAmount !== null
                ? 'border-white/10 text-dark-500 cursor-not-allowed'
                : 'border-white/10 text-white hover:border-accent-500 hover:bg-accent-500/10 hover:-translate-y-0.5 cursor-pointer'
            )}
          >
            {loadingAmount === amount ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Coffee className="w-4 h-4 text-accent-400" />
            )}
            {amount}€
          </button>
        ))}
      </div>

      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 mt-3"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
