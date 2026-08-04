// All UI chrome strings live here so the site can be flipped to another language
// later without hunting through components. Content stays in .mdx per language.
export const strings = {
  search: {
    open: '検索',
    placeholder: 'ページ・見出しを検索…',
    empty: '一致する項目がありません',
    hint: '↑↓ で移動 · Enter で開く · Esc で閉じる',
  },
  nav: {
    menu: 'ナビゲーション',
    close: '閉じる',
    onThisPage: 'このページの内容',
    prev: '前のページ',
    next: '次のページ',
    prerequisites: '前提',
  },
  theme: {
    toLight: 'ライトテーマに切り替え',
    toDark: 'ダークテーマに切り替え',
  },
  page: {
    learnHeading: 'このページで学ぶこと',
    summaryHeading: 'まとめ',
    exerciseHeading: '練習問題',
    showAnswer: '答えを見る',
    showHint: 'ヒントを見る',
    togetherHeading: '一緒にやってみよう',
    partIntroHeading: 'このパートを始める前に',
    minutesLabel: '読了目安',
    markRead: '読んだことにする',
    markedRead: '読んだ ✓',
    feedbackLead: 'このページ、わかりにくかったですか？',
    feedbackLink: '気づいたことを送る',
  },
  progress: {
    overall: '全体の進捗',
    unit: 'ページ',
  },
  reset: {
    part: 'このパートの既読をリセット',
    all: 'すべての記録をリセット',
    confirmTitle: 'すべての既読記録を消しますか？',
    confirmBody: 'この操作は取り消せません。読んだページの記録がすべて消えます。',
    cancel: 'キャンセル',
    confirmOk: 'すべて消す',
  },
} as const
