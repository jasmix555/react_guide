import { Link, useRouteError } from 'react-router-dom'

import { TopBar } from '@/components/TopBar'

/**
 * Route-level error boundary. An uncaught render error — a broken demo, or a
 * lazy chunk that fails to load after a redeploy — lands here instead of
 * blanking the whole app to a white screen.
 */
export function RouteError() {
  const error = useRouteError()
  const detail =
    error instanceof Error ? error.message : typeof error === 'string' ? error : ''

  return (
    <>
      <TopBar />
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--sp-16) var(--sp-4)' }}>
        <h1 style={{ fontSize: 'var(--fs-h1)' }}>表示中に問題が発生しました</h1>
        <p style={{ color: 'var(--c-muted)', marginTop: 'var(--sp-3)', lineHeight: 'var(--lh-body)' }}>
          このページの読み込み中にエラーが起きました。ページを再読み込みするか、トップへ戻ってください。
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginTop: 'var(--sp-6)' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              border: '1px solid var(--c-line)',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--c-surface)',
              color: 'var(--c-text)',
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              padding: '7px 16px',
              cursor: 'pointer',
            }}
          >
            再読み込み
          </button>
          <Link to="/">← トップへ戻る</Link>
        </p>
        {detail && (
          <pre
            style={{
              marginTop: 'var(--sp-6)',
              padding: 'var(--sp-3)',
              background: 'var(--c-sunk)',
              border: '1px solid var(--c-line)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--c-muted)',
              fontSize: 'var(--fs-small)',
              fontFamily: 'var(--font-mono)',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {detail}
          </pre>
        )}
      </div>
    </>
  )
}
