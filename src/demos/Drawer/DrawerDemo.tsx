import { useLocale } from '@/hooks/useLocale'

import { Drawer } from './Drawer'

const items = [
  { label: 'ホーム', href: '#home', labelEn: 'Home' },
  { label: '商品一覧', href: '#products', labelEn: 'Products' },
  { label: 'お知らせ', href: '#news', labelEn: 'News' },
  { label: 'お問い合わせ', href: '#contact', labelEn: 'Contact' },
]

export function DrawerDemo() {
  const en = useLocale() === 'en'
  const localizedItems = items.map((item) => ({
    label: en ? item.labelEn : item.label,
    href: item.href,
  }))

  return <Drawer items={localizedItems} />
}
