import { Drawer } from './Drawer'

const items = [
  { label: 'ホーム', href: '#home' },
  { label: '商品一覧', href: '#products' },
  { label: 'お知らせ', href: '#news' },
  { label: 'お問い合わせ', href: '#contact' },
]

export function DrawerDemo() {
  return <Drawer items={items} />
}
