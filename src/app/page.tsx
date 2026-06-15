'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, BookOpen, Bot, Braces } from 'lucide-react'
import LeadForm from '@/components/LeadForm'
import { BOOK } from '@/lib/content'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function Home() {
  return (
    <main className="relative">
      {/* ===== Barre de marque ===== */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <span className="font-mono text-sm tracking-tight text-dark-200">
          <span className="text-accent-400">maik</span>agency
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-dark-300 glass rounded-full px-3 py-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent-400" />
          Ebook offert
        </span>
      </header>

      {/* ===== HERO ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 md:pt-12 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonne gauche : accroche + titre + formulaire */}
          <div className="order-2 lg:order-1">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-400 bg-accent-500/10 border border-accent-500/20 rounded-full px-3 py-1.5 mb-6">
                <Zap className="w-3.5 h-3.5" />
                Prompt Engineering
              </span>
            </motion.div>

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
              className="text-base md:text-lg text-dark-300 leading-relaxed mb-8 max-w-xl"
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
              <div className="packshot relative w-[260px] sm:w-[320px] lg:w-[380px] rounded-xl overflow-hidden shadow-2xl shadow-accent-500/20 ring-1 ring-white/10">
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
      </section>

      {/* ===== CE QUE TU VAS APPRENDRE ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-400 mb-4">
            <BookOpen className="w-4 h-4" />
            Dans ce livre
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ce que tu vas <span className="gradient-text">apprendre à faire</span>
          </h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">
            Des compétences concrètes, applicables dès ta prochaine conversation avec l&apos;IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {BOOK.learn.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
              className="card flex items-start gap-3"
            >
              <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-accent-500/15 text-accent-400">
                <Check className="w-4 h-4" />
              </span>
              <span className="text-dark-200 leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Bandeau de mise en avant des points forts */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: Braces, title: 'JSON strict', desc: 'Des sorties propres et exploitables' },
            { icon: Bot, title: 'Agents IA', desc: 'Une équipe pilotée avec ses garde-fous' },
            { icon: Sparkles, title: 'Modèles prêts', desc: 'CO-STAR, RTF, CREATE, RACE…' },
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center">
              <f.icon className="w-6 h-6 text-accent-400 mx-auto mb-3" />
              <p className="font-semibold mb-1">{f.title}</p>
              <p className="text-sm text-dark-400">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 text-center">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="glass glow-border rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Prêt à <span className="gradient-text">dompter l&apos;IA</span>&nbsp;?
          </h2>
          <p className="text-dark-300 mb-8">
            Laisse ton email, choisis ton profil, et reçois l&apos;ebook tout de suite.
          </p>
          <div className="max-w-md mx-auto">
            <LeadForm />
          </div>
        </motion.div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-dark-500">
          <span className="font-mono">
            <span className="text-accent-400">maik</span>agency · {new Date().getFullYear()}
          </span>
          <span>Fait avec ⚡ pour les pros de l&apos;IA</span>
        </div>
      </footer>
    </main>
  )
}
