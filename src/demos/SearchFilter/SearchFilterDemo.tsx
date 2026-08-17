import { useLocale } from '@/hooks/useLocale'

import { SearchFilter } from './SearchFilter'

export function SearchFilterDemo() {
  const en = useLocale() === 'en'
  const items = en
    ? [
        'Ceramic mug',
        'Enamel mug',
        'Cast iron pan',
        'Linen apron',
        'Oak cutting board',
        'Cotton tea towel',
        'Glass carafe',
      ]
    : [
        'セラミックマグ',
        'ホーローマグ',
        '鋳鉄フライパン',
        'リネンエプロン',
        'オーク カッティングボード',
        'コットン ふきん',
        'ガラス カラフェ',
      ]

  return <SearchFilter items={items} />
}
