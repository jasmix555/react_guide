import { useEffect } from 'react'

/** Sets document.title, the meta description, and <html lang> for the current route
 *  (react-router v7 has no built-in head management, so a small effect covers it). */
export function useDocumentMeta(title: string, description?: string, lang?: string) {
  useEffect(() => {
    document.title = title
    if (lang) document.documentElement.lang = lang
    if (!description) return
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description, lang])
}
