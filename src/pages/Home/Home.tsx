import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { TopBar } from '@/components/TopBar'
import { site } from '@/config/site'
import { strings } from '@/config/strings.ja'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useReadProgress } from '@/hooks/useReadProgress'
import { getLastRead } from '@/lib/lastRead'
import { getPage, tabsNav } from '@/lib/nav'

import styles from './style.module.scss'

const learn = tabsNav.find((t) => t.id === 'learn')
const learnPages = learn?.pages ?? []
const firstLearn = learnPages[0]?.href ?? '/'
const learnRoutes = learnPages.map((p) => p.route)

// Reading paths. Links point only to pages that exist today; the curriculum
// fills in over the coming phases.
const paths = [
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
]

export function Home() {
  useDocumentMeta(site.name, site.tagline)
  const { countRead, resetAll } = useReadProgress()
  const confirmRef = useRef<HTMLDialogElement>(null)
  // 続きから: the last docs page opened, if it still exists in the nav.
  const [last] = useState(() => {
    const stored = getLastRead()
    if (!stored) return null
    const page = getPage(stored.route)
    return page ? { href: page.href, title: page.title } : null
  })
  const done = countRead(learnRoutes)
  const total = learnRoutes.length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{site.tagline}</p>
          <h1 className={styles.title}>
            公式ドキュメントで迷った人のための、
            <br />
            React 実践ガイド。
          </h1>
          <p className={styles.lead}>
            「どう書くか」の前に「どれを選ぶか」を決める。うちの標準に沿って、
            AI 頼みでなく自分でコンポーネントを書けるようになるための道案内です。
          </p>
          <div className={styles.cta}>
            {last ? (
              <Link to={last.href} className={styles.primary}>
                続きから読む
              </Link>
            ) : (
              <Link to={firstLearn} className={styles.primary}>
                はじめる
              </Link>
            )}
            {last && (
              <Link to={firstLearn} className={styles.secondary}>
                最初から
              </Link>
            )}
            <span className={styles.hint}>
              または <kbd>Ctrl+K</kbd> で検索
            </span>
          </div>
          {last && (
            <p className={styles.lastNote}>
              前回のつづき：<Link to={last.href}>{last.title}</Link>
            </p>
          )}
        </section>

        {total > 0 && (
          <section className={styles.progress} aria-label={strings.progress.overall}>
            <div className={styles.progressHead}>
              <span>{strings.progress.overall}</span>
              <span className={styles.progressCount}>
                {done} / {total} {strings.progress.unit}（{pct}%）
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
            {done > 0 && (
              <button
                type="button"
                className={styles.resetAll}
                onClick={() => confirmRef.current?.showModal()}
              >
                {strings.reset.all}
              </button>
            )}
          </section>
        )}

        <dialog ref={confirmRef} className={styles.confirm}>
          <h2 className={styles.confirmTitle}>{strings.reset.confirmTitle}</h2>
          <p className={styles.confirmBody}>{strings.reset.confirmBody}</p>
          <div className={styles.confirmActions}>
            <button
              type="button"
              className={styles.confirmCancel}
              onClick={() => confirmRef.current?.close()}
            >
              {strings.reset.cancel}
            </button>
            <button
              type="button"
              className={styles.confirmOk}
              onClick={() => {
                resetAll()
                confirmRef.current?.close()
              }}
            >
              {strings.reset.confirmOk}
            </button>
          </div>
        </dialog>

        <section aria-labelledby="paths-h" className={styles.paths}>
          <h2 id="paths-h" className={styles.sectionTitle}>
            読み方の順路
          </h2>
          <div className={styles.pathGrid}>
            {paths.map((p) => (
              <div key={p.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
                <ul className={styles.cardLinks}>
                  {p.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to}>{l.label} →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
