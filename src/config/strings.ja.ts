// All UI chrome strings live here so the site can be flipped to another language
// without hunting through components. Content stays in .mdx per language.
// The English mirror is strings.en.ts — keep the two shapes identical (the type
// is inferred from this file in config/strings.ts, so a missing key breaks EN).
export const strings = {
  langName: '日本語',
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
    openMenu: 'ナビゲーションを開く',
    closeMenu: 'ナビゲーションを閉じる',
    tabsAria: 'セクション',
    guideToc: 'ガイドの目次',
    prevNextAria: '前後のページ',
    // Used as `${page.title} ${sectionsSuffix}` for the peek toggle's aria-label.
    sectionsSuffix: 'のセクション',
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
    loading: '読み込み中…',
    markRead: '読んだことにする',
    markedRead: '読んだ ✓',
    feedbackLead: 'このページ、わかりにくかったですか？',
    feedbackLink: '気づいたことを送る',
    // Full label shown in the page header; short form for the sidebar tooltip.
    readingTime: (n: number) => `読了目安 約 ${n} 分`,
    readingShort: (n: number) => `約 ${n} 分`,
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
  notFound: {
    title: 'ページが見つかりません',
    body: 'URL が変わったか、まだ書かれていないページです。',
    back: '← トップへ戻る',
  },
  error: {
    title: '表示中に問題が発生しました',
    body: 'このページの読み込み中にエラーが起きました。ページを再読み込みするか、トップへ戻ってください。',
    reload: '再読み込み',
    back: '← トップへ戻る',
  },
  // Labels for the in-MDX components (Callout family, Demo, DemoSource, CopyButton).
  callout: {
    note: 'メモ',
    warn: '落とし穴',
    mistake: 'やりがちなミス',
    analogy: '例え話',
    stdPill: 'うちの標準',
    stdAltDefault: 'これ以外を選ぶ場合',
    deeperTag: '深掘り',
    jsNoteTag: 'JS のおさらい',
    jsNoteMore: '詳しく →',
  },
  mdx: {
    demoLabel: 'ライブデモ',
    demoReset: 'リセット',
    demoSource: 'ソースコード（クリックで開閉）',
    copy: 'コピー',
    copied: 'コピー済み',
  },
  home: {
    heroLine1: '公式ドキュメントで迷った人のための、',
    heroLine2: 'React 実践ガイド。',
    lead: '「どう書くか」の前に「どれを選ぶか」を決める。うちの標準に沿って、AI 頼みでなく自分でコンポーネントを書けるようになるための道案内です。',
    resume: '続きから読む',
    start: 'はじめる',
    fromStart: '最初から',
    searchHintPre: 'または',
    searchHintPost: 'で検索',
    lastNote: '前回のつづき：',
    pathsTitle: '読み方の順路',
    paths: [
      {
        title: 'まず 1 日で全体像',
        body: 'React が「何をしてくれるものか」を掴む。JS の自信で入口が分かれます。',
        links: [
          { label: 'JS に自信がない人はここから：分割代入', to: '/guide/javascript/destructuring' },
          { label: 'JS は書ける人はここから：variant で再利用する', to: '/guide/components/button-variants' },
        ],
      },
      {
        title: '1 週間で書けるようになる',
        body: 'コンポーネント → props → state と、手を動かしながら順に。',
        links: [
          { label: 'variant で再利用する', to: '/guide/components/button-variants' },
          { label: '配列の state を更新する', to: '/guide/state/use-state/updating-array-state' },
        ],
      },
      {
        title: '必要になったときに引く',
        body: '「これ作りたい」から逆引きする。レシピと検索（Ctrl+K）が入口です。',
        links: [{ label: 'モーダルの作り方', to: '/recipes/modal' }],
      },
      {
        title: '環境構築は済んでいる人へ',
        body: 'Node・npm（または pnpm）がもう入っているなら、Part 1 は飛ばして大丈夫。',
        links: [
          { label: 'npm create vite から始める', to: '/guide/setup/create-vite' },
          { label: '環境は分かる → Part 2（JavaScript）へ', to: '/guide/javascript/const-let' },
        ],
      },
    ],
  },
}
