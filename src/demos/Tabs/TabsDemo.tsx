import { useLocale } from '@/hooks/useLocale'

import { Tabs } from './Tabs'

export function TabsDemo() {
  const en = useLocale() === 'en'
  const tabs = en
    ? [
        { label: 'Description', content: 'A 100% cotton tote bag. Big enough to hold an A4 sheet as-is.' },
        { label: 'Specs', content: 'Size: 35 cm H x 40 cm W / Weight: approx. 300 g / Colors: natural, navy' },
        { label: 'Reviews', content: '"I use it every day." "Bigger and handier than I expected." (★4.6)' },
      ]
    : [
        { label: '説明', content: 'コットン 100% のトートバッグ。A4 がそのまま入る大きさです。' },
        { label: '仕様', content: 'サイズ：縦 35 × 横 40cm ／ 重さ：約 300g ／ 色：生成り・紺' },
        { label: 'レビュー', content: '「毎日使っています」「思ったより大きくて便利」（★4.6）' },
      ]

  return <Tabs tabs={tabs} />
}
