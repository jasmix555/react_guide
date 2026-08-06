import type { Locale } from '@/lib/i18n'

// repoUrl / feedbackUrl are the same in every language; name / tagline are per-locale.
const shared = {
  repoUrl: 'https://github.com/jasmix555/learning',
  // Where feedback goes. Point this at the team's real channel (issue tracker /
  // form) before launch.
  feedbackUrl: 'https://github.com/jasmix555/learning/issues/new',
}

export const siteByLocale = {
  ja: {
    ...shared,
    name: 'React実践ガイド',
    tagline: 'LP コーダーのための React + TypeScript',
  },
  en: {
    ...shared,
    name: 'React in Practice',
    tagline: 'React + TypeScript for LP coders',
  },
} satisfies Record<Locale, { name: string; tagline: string; repoUrl: string; feedbackUrl: string }>

/** Default-locale site info, for the few non-localized call sites. */
export const site = siteByLocale.ja
