import { Tabs } from './Tabs'

const tabs = [
  { label: '説明', content: 'コットン 100% のトートバッグ。A4 がそのまま入る大きさです。' },
  { label: '仕様', content: 'サイズ：縦 35 × 横 40cm ／ 重さ：約 300g ／ 色：生成り・紺' },
  { label: 'レビュー', content: '「毎日使っています」「思ったより大きくて便利」（★4.6）' },
]

export function TabsDemo() {
  return <Tabs tabs={tabs} />
}
