// Remembers the last docs page the reader opened, so the home page can offer
// 「続きから」 instead of always sending them back to page 1. One value in
// localStorage, written by GuidePage on every route change, read by Home.

const KEY = 'last-read'

export interface LastRead {
  route: string
  title: string
  href: string
}

export function getLastRead(): LastRead | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as LastRead) : null
  } catch {
    // private mode / disabled storage — treat as "no history".
    return null
  }
}

export function setLastRead(value: LastRead): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // ponytail: best-effort; losing the bookmark is harmless.
  }
}
