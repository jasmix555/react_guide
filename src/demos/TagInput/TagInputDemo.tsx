import { useState } from 'react'

import { useLocale } from '@/hooks/useLocale'

import { TagInput } from './TagInput'

export function TagInputDemo() {
  const en = useLocale() === 'en'
  const [tags, setTags] = useState(en ? ['kitchen', 'gift'] : ['キッチン', 'ギフト'])

  return <TagInput tags={tags} onChange={setTags} />
}
