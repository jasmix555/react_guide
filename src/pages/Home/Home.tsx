import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { ProgressRing } from '@/components/ProgressRing'
import { TopBar } from '@/components/TopBar'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useLocale, useSite, useStrings } from '@/hooks/useLocale'
import { useReadProgress } from '@/hooks/useReadProgress'
import { withLocale } from '@/lib/i18n'
import { getLastRead } from '@/lib/lastRead'
import { getPage, getTabs } from '@/lib/nav'

import styles from './style.module.scss'

interface HomeCard {
  title: string
  body: string
  links: { label: string; to: string }[]
}

/** The card grid shared by "how to read this" and "what do you want to do". */
function CardGrid({ items }: { items: HomeCard[] }) {
  const locale = useLocale()
  return (
    <div className={styles.pathGrid}>
      {items.map((c) => (
        <div key={c.title} className={styles.card}>
          <h3 className={styles.cardTitle}>{c.title}</h3>
          <p className={styles.cardBody}>{c.body}</p>
          <ul className={styles.cardLinks}>
            {c.links.map((l) => (
              <li key={l.to}>
                <Link to={withLocale(l.to, locale)}>{l.label} →</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function Home() {
  const locale = useLocale()
  const site = useSite()
  const strings = useStrings()
  useDocumentMeta(site.name, site.tagline, locale)

  const tabs = getTabs(locale)
  const learnTab = tabs.find((t) => t.id === 'learn')
  const learnPages = learnTab?.pages ?? []
  const firstLearn = learnPages[0]?.href ?? `/${locale}`
  const learnRoutes = learnPages.map((p) => p.route)

  const { countRead, resetAll } = useReadProgress()
  const confirmRef = useRef<HTMLDialogElement>(null)
  // Resume: the last docs page opened, resolved in the CURRENT locale so the
  // link and title follow a language toggle (Home is reused across /ja and /en,
  // so this must recompute on locale change — not freeze at first mount).
  const last = useMemo(() => {
    const stored = getLastRead()
    if (!stored) return null
    const page = getPage(locale, stored.route)
    return page ? { href: page.href, title: page.title } : null
  }, [locale])
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
            {strings.home.heroLine1}
            <br />
            {strings.home.heroLine2}
          </h1>
          <p className={styles.lead}>{strings.home.lead}</p>
          <div className={styles.cta}>
            {last ? (
              <Link to={last.href} className={styles.primary}>
                {strings.home.resume}
              </Link>
            ) : (
              <Link to={firstLearn} className={styles.primary}>
                {strings.home.start}
              </Link>
            )}
            {last && (
              <Link to={firstLearn} className={styles.secondary}>
                {strings.home.fromStart}
              </Link>
            )}
            <span className={styles.hint}>
              {strings.home.searchHintPre} <kbd>Ctrl+K</kbd> {strings.home.searchHintPost}
            </span>
          </div>
          {last && (
            <p className={styles.lastNote}>
              {strings.home.lastNote}
              <Link to={last.href}>{last.title}</Link>
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
            {strings.home.pathsTitle}
          </h2>
          <CardGrid items={strings.home.paths} />
        </section>

        {/* Goal-first entry points. The routes above answer "where do I start
            reading"; these answer "what will I be able to do", and they're what
            surfaces the Libraries and Recipes sections to a first-time reader. */}
        <section aria-labelledby="goals-h" className={styles.goals}>
          <h2 id="goals-h" className={styles.sectionTitle}>
            {strings.home.goalsTitle}
          </h2>
          <p className={styles.sectionLead}>{strings.home.goalsLead}</p>
          <CardGrid items={strings.home.goals} />
        </section>

        {/* Every part of every section, straight from the nav — so a new part
            appears here the moment it's added, with no second list to maintain. */}
        <section aria-labelledby="browse-h" className={styles.browse}>
          <h2 id="browse-h" className={styles.sectionTitle}>
            {strings.home.browseTitle}
          </h2>
          <p className={styles.sectionLead}>{strings.home.browseLead}</p>

          {tabs
            .filter((tab) => tab.parts.length > 0)
            .map((tab) => (
              <div className={styles.tabGroup} key={tab.id}>
                <h3 className={styles.tabName}>{tab.title}</h3>
                <div className={styles.partGrid}>
                  {tab.parts.map((part) => {
                    const first = part.pages[0]
                    if (!first) return null
                    const partDone = countRead(part.pages.map((p) => p.route))
                    const minutes = part.pages.reduce((n, p) => n + (p.minutes ?? 0), 0)
                    return (
                      <Link to={first.href} className={styles.partCard} key={part.id}>
                        <span className={styles.partCardHead}>
                          <span className={styles.partCardTitle}>
                            {part.no != null && (
                              <span className={styles.partCardNo}>{part.no}. </span>
                            )}
                            {part.title}
                          </span>
                          <ProgressRing done={partDone} total={part.pages.length} size={18} />
                        </span>
                        <span className={styles.partCardMeta}>
                          {part.pages.length} {strings.progress.unit}
                          {minutes > 0 && ` · ${strings.page.readingShort(minutes)}`}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
