import { useLocale } from '@/hooks/useLocale'

import { Greeting } from './Greeting'

export function GreetingDemo() {
  const en = useLocale() === 'en'
  return (
    <>
      <Greeting name={en ? 'Sato' : '佐藤'} role={en ? 'Designer' : 'デザイナー'} />
      <Greeting name={en ? 'Suzuki' : '鈴木'} role={en ? 'Coder' : 'コーダー'} />
      {/* Without a role prop, it falls back to the default "Member" */}
      <Greeting name={en ? 'Tanaka' : '田中'} />
    </>
  )
}
