import { Link } from 'react-router-dom'

import { TopBar } from '@/components/TopBar'
import { useLocale, useStrings } from '@/hooks/useLocale'

/** Body-only 404, used inside DocsLayout when a route has no page. */
export function NotFound() {
  const locale = useLocale()
  const strings = useStrings()
  return (
    <div style={{ padding: 'var(--sp-8) 0' }}>
      <h1 style={{ fontSize: 'var(--fs-h1)' }}>{strings.notFound.title}</h1>
      <p style={{ color: 'var(--c-muted)', marginTop: 'var(--sp-3)' }}>{strings.notFound.body}</p>
      <p style={{ marginTop: 'var(--sp-4)' }}>
        <Link to={`/${locale}`}>{strings.notFound.back}</Link>
      </p>
    </div>
  )
}

/** Full-page 404 (with top bar) for the top-level catch-all route. */
export function NotFoundStandalone() {
  return (
    <>
      <TopBar />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--sp-16) var(--sp-4)' }}>
        <NotFound />
      </div>
    </>
  )
}
