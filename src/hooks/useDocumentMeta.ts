import { useEffect } from 'react'

/** Sets document.title and the meta description for the current route (react-router
 *  v7 has no built-in head management, so a small effect covers it). */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (!description) return
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
}
