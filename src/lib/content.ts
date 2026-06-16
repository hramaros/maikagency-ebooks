// Contenu éditorial centralisé du landing page

export const BOOK = {
  title: 'Devenir un dieu du prompt engineering',
  // Accroche percutante (hook)
  hook: "Tout le monde supplie l'IA. Toi, tu vas la diriger.",
  // Sous-titre / promesse
  subtitle:
    "Le guide qui transforme tes prompts approximatifs en instructions précises, fiables et reproductibles. Maîtrise enfin l'IA au lieu de la subir.",
  // Couverture (packshot). Image hébergée localement (optimisée depuis Drive).
  coverSrc: '/cover-front.png',
  coverAlt: 'Couverture de l\'ebook « Devenir un dieu du prompt engineering »',
  // Ce que le lecteur va apprendre (reformulation simple)
  learn: [
    "Donner un contexte clair à l'IA pour qu'elle comprenne vraiment ta demande",
    'Formuler un objectif précis, sans détour',
    'Choisir le bon ton selon la personne qui te lit',
    'Obtenir des réponses nettes, en finir avec le flou',
    "Réduire les hallucinations de l'IA",
    'Structurer les réponses en formats utiles — jusqu\'au JSON strict',
    "Piloter une petite équipe d'agents IA, avec ses garde-fous",
    'Évaluer (et faire évaluer) une réponse avec de vrais critères',
    'Réutiliser des modèles de prompts prêts à l\'emploi (CO-STAR, RTF, CREATE, RACE…)',
  ],
  // Version condensée des points clés (bande « au programme » du one-pager)
  highlights: [
    'Contexte clair',
    'Objectif précis',
    'Bon ton',
    'Zéro réponse floue',
    'Moins d\'hallucinations',
    'JSON strict',
    'Agents IA encadrés',
    'Évaluer une réponse',
    'Modèles CO-STAR, RTF…',
  ],
}

export const PROFILES = [
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'professionnel', label: 'Professionnel' },
] as const

export type ProfileValue = (typeof PROFILES)[number]['value']

// Secteurs d'activité proposés dans le formulaire (dropdown)
export const SECTORS = [
  { value: 'tech', label: 'Tech / Informatique' },
  { value: 'marketing', label: 'Marketing / Communication' },
  { value: 'education', label: 'Éducation / Formation' },
  { value: 'sante', label: 'Santé' },
  { value: 'finance', label: 'Finance / Assurance' },
  { value: 'commerce', label: 'Commerce / Vente' },
  { value: 'industrie', label: 'Industrie / BTP' },
  { value: 'conseil', label: 'Conseil / Services' },
  { value: 'medias', label: 'Médias / Création' },
  { value: 'autre', label: 'Autre' },
] as const

export type SectorValue = (typeof SECTORS)[number]['value']
