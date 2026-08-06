import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'

import { TopBar } from '@/components/TopBar'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useLocale, useSite, useStrings } from '@/hooks/useLocale'
import { useReadProgress } from '@/hooks/useReadProgress'
import { withLocale } from '@/lib/i18n'
import { getLastRead } from '@/lib/lastRead'
import { getPage, getTabs } from '@/lib/nav'

import styles from './style.module.scss'

export function Home() {
  const locale = useLocale()
  const site = useSite()
  const strings = useStrings()
  useDocumentMeta(site.name, site.tagline, locale)

  const learnTab = getTabs(locale).find((t) => t.id === 'learn')
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
          <div className={styles.pathGrid}>
            {strings.home.paths.map((p) => (
              <div key={p.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
                <ul className={styles.cardLinks}>
                  {p.links.map((l) => (
                    <li key={l.to}>
                      <Link to={withLocale(l.to, locale)}>{l.label} →</Link>
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
