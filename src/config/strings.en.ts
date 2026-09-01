// English chrome strings. Mirror of strings.ja.ts — the shape MUST match (the
// Strings type is inferred from the Japanese file in config/strings.ts).
export const strings = {
  langName: 'English',
  search: {
    open: 'Search',
    placeholder: 'Search pages and headings…',
    empty: 'No matches',
    hint: '↑↓ to move · Enter to open · Esc to close',
  },
  nav: {
    menu: 'Navigation',
    close: 'Close',
    onThisPage: 'On this page',
    prev: 'Previous',
    next: 'Next',
    prerequisites: 'Prerequisites',
    openMenu: 'Open navigation',
    closeMenu: 'Close navigation',
    tabsAria: 'Sections',
    guideToc: 'Guide contents',
    prevNextAria: 'Previous and next pages',
    sectionsSuffix: 'sections',
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  page: {
    learnHeading: 'What you will learn',
    summaryHeading: 'Summary',
    exerciseHeading: 'Exercises',
    showAnswer: 'Show answer',
    showHint: 'Show hint',
    togetherHeading: "Let's try it together",
    partIntroHeading: 'Before you start this part',
    minutesLabel: 'Reading time',
    loading: 'Loading…',
    markRead: 'Mark as read',
    markedRead: 'Read ✓',
    feedbackLead: 'Was this page hard to follow?',
    feedbackLink: 'Tell us what tripped you up',
    readingTime: (n: number) => `${n} min read`,
    readingShort: (n: number) => `${n} min`,
  },
  progress: {
    overall: 'Overall progress',
    unit: 'pages',
  },
  reset: {
    part: 'Reset read state for this part',
    all: 'Reset all progress',
    confirmTitle: 'Clear all your read history?',
    confirmBody: 'This cannot be undone. Every page you have marked as read will be forgotten.',
    cancel: 'Cancel',
    confirmOk: 'Clear everything',
  },
  notFound: {
    title: 'Page not found',
    body: 'The URL may have changed, or this page has not been written yet.',
    back: '← Back to home',
  },
  error: {
    title: 'Something went wrong',
    body: 'An error occurred while loading this page. Try reloading, or go back to the home page.',
    reload: 'Reload',
    back: '← Back to home',
  },
  callout: {
    note: 'Note',
    warn: 'Gotcha',
    mistake: 'Common mistake',
    analogy: 'Analogy',
    stdPill: 'Our standard',
    stdAltDefault: 'When to choose otherwise',
    deeperTag: 'Deeper',
    jsNoteTag: 'JS refresher',
    jsNoteMore: 'Learn more →',
  },
  mdx: {
    demoLabel: 'Live demo',
    demoReset: 'Reset',
    demoSource: 'Source code (click to toggle)',
    copy: 'Copy',
    copied: 'Copied',
  },
  home: {
    heroLine1: 'For everyone the official docs lost along the way:',
    heroLine2: 'a practical guide to React.',
    lead: 'Decide which tool to use before worrying about how to write it. A guided path — following our house standards — to writing components yourself instead of leaning on AI.',
    resume: 'Resume reading',
    start: 'Get started',
    fromStart: 'From the start',
    searchHintPre: 'or',
    searchHintPost: 'to search',
    lastNote: 'Where you left off: ',
    pathsTitle: 'How to read this',
    goalsTitle: 'What do you want to be able to do?',
    goalsLead:
      'Pick a goal and start there — most of these run on into the Libraries and Recipes sections.',
    goals: [
      {
        title: 'Make things move',
        body: 'Fade elements in, drive motion from scroll, run a slider — the animation that is awkward to do in CSS alone.',
        links: [
          { label: 'Framer Motion (motion)', to: '/libraries/framer-motion/goal' },
          { label: 'GSAP: building on a timeline', to: '/libraries/gsap/goal' },
          { label: 'Swiper: sliders', to: '/libraries/swiper/goal' },
        ],
      },
      {
        title: 'Put real server data on screen',
        body: 'From what a server and an API actually are, through loading / error / success states, to validating what arrives.',
        links: [
          { label: 'Part 8: data fetching', to: '/guide/data/goal' },
          { label: 'Talking to a server with axios', to: '/libraries/axios' },
          { label: 'Validating shapes with zod', to: '/libraries/zod' },
        ],
      },
      {
        title: 'Build forms that hold up',
        body: 'Validation, error messages, blocking the double-submit, and the wiring that makes a form usable with a screen reader.',
        links: [
          { label: 'Forms with react-hook-form', to: '/libraries/react-hook-form' },
          { label: 'Keeping the rules in one place with zod', to: '/libraries/zod' },
        ],
      },
      {
        title: 'Let types catch your mistakes',
        body: 'Type your props and state so typos surface before you run anything — TypeScript as an ally rather than a nag.',
        links: [
          { label: 'Part 6: TypeScript for React', to: '/guide/typescript/goal' },
          { label: 'Typing props', to: '/guide/typescript/typing-props' },
        ],
      },
      {
        title: 'Build the look yourself',
        body: 'SCSS Modules, design tokens, responsive, icons. The CSS you already know from LP work carries straight over.',
        links: [
          { label: 'Part 5: styling', to: '/guide/styling/goal' },
          { label: 'Responsive', to: '/guide/styling/responsive' },
          { label: 'Icons with react-icons', to: '/libraries/react-icons' },
        ],
      },
      {
        title: 'Write code that holds up on a team',
        body: 'Put your library choices into words, and make code quality a mechanism rather than a matter of willpower.',
        links: [
          { label: 'How to choose a library', to: '/libraries/choosing' },
          { label: 'Catching mistakes with ESLint', to: '/libraries/eslint' },
          { label: 'Formatting with Prettier', to: '/libraries/prettier' },
        ],
      },
    ],
    browseTitle: 'Jump straight to a part',
    browseLead: 'Dive in wherever you like — the ring shows how much of that part you have read.',
    paths: [
      {
        title: 'The big picture in a day',
        body: 'Get a feel for what React actually does for you. Where you start depends on how confident you are with JS.',
        links: [
          { label: 'Shaky on JS? Start here: destructuring', to: '/guide/javascript/destructuring' },
          { label: 'Comfortable with JS? Start here: reusing with variants', to: '/guide/components/button-variants' },
        ],
      },
      {
        title: 'Writing React in a week',
        body: 'Component → props → state, hands-on and in order.',
        links: [
          { label: 'Reusing with variants', to: '/guide/components/button-variants' },
          { label: 'useState from top to bottom', to: '/guide/state/use-state/basics' },
        ],
      },
      {
        title: 'Look things up as you need them',
        body: 'Work backwards from "I want to build this." Recipes and search (Ctrl+K) are your way in.',
        links: [{ label: 'How to build a modal', to: '/recipes/modal' }],
      },
      {
        title: 'Already set up?',
        body: 'If Node and npm (or pnpm) are already installed, feel free to skip Part 1.',
        links: [
          { label: 'Start from npm create vite', to: '/guide/setup/create-vite' },
          { label: 'Know the setup? Jump to Part 2 (JavaScript)', to: '/guide/javascript/const-let' },
        ],
      },
    ],
  },
}
