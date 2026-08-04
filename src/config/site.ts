export const site = {
  name: 'React実践ガイド',
  tagline: 'LP コーダーのための React + TypeScript',
  repoUrl: 'https://github.com/jasmix555/learning',
  // Where 「わかりにくい」 feedback goes. Point this at the team's real channel
  // (issue tracker / form) before launch.
  feedbackUrl: 'https://github.com/jasmix555/learning/issues/new',
} as const

/** Top-level tabs (react.dev's Learn / Reference / Community analog). */
export const tabs = [
  { id: 'learn', title: '学ぶ', path: '/guide' },
  { id: 'reference', title: 'リファレンス', path: '/reference' },
  { id: 'recipes', title: 'レシピ', path: '/recipes' },
  { id: 'standards', title: '社内標準', path: '/standards' },
] as const
