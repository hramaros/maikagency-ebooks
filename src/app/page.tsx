'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Sparkles, Zap } from 'lucide-react'
import LeadForm from '@/components/LeadForm'
import { BOOK } from '@/lib/content'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* ===== Barre de marque ===== */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <span className="font-mono text-sm tracking-tight text-dark-200">
          <span className="text-accent-400">maik</span>agency
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-dark-300 glass rounded-full px-3 py-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent-400" />
          Ebook offert
        </span>
      </header>

      {/* ===== HERO (tout en une vue) ===== */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12 md:pt-6 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Colonne gauche : accroche + titre + formulaire */}
          <div className="order-2 lg:order-1">
            <motion.span
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-400 bg-accent-500/10 border border-accent-500/20 rounded-full px-3 py-1.5 mb-5"
            >
              <Zap className="w-3.5 h-3.5" />
              Prompt Engineering
            </motion.span>

            {/* Hook percutant */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-lg md:text-xl font-medium text-dark-200 mb-3"
            >
              {BOOK.hook}
            </motion.p>

            {/* Titre */}
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-5"
            >
              Devenir un{' '}
              <span className="gradient-text">dieu du prompt engineering</span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base md:text-lg text-dark-300 leading-relaxed mb-7 max-w-xl"
            >
              {BOOK.subtitle}
            </motion.p>

            {/* Formulaire */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-md">
              <LeadForm />
            </motion.div>
          </div>

          {/* Colonne droite : packshot de la couverture */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateY: -24 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              {/* Halo lumineux derrière la couverture */}
              <div className="absolute -inset-8 bg-accent-500/20 blur-3xl rounded-full" aria-hidden="true" />
              <div className="packshot relative w-[230px] sm:w-[280px] lg:w-[340px] rounded-xl overflow-hidden shadow-2xl shadow-accent-500/20 ring-1 ring-white/10">
                <Image
                  src={BOOK.coverSrc}
                  alt={BOOK.coverAlt}
                  width={1000}
                  height={1333}
                  priority
                  className="w-full h-auto"
                />
                {/* Reflet sur la tranche */}
                <div
                  className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-white/20 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ===== Au programme : points clés condensés ===== */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-14"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-dark-400 mb-3 text-center">
            Au programme
          </p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {BOOK.highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 text-sm text-dark-200 glass rounded-full px-3.5 py-1.5"
              >
                <Check className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-dark-500">
          <span className="font-mono">
            <span className="text-accent-400">maik</span>agency · {new Date().getFullYear()}
          </span>
          <span>Fait avec ⚡ pour les pros de l&apos;IA</span>
        </div>
      </footer>
    </main>
  )
}
