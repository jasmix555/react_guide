import { useLocale } from '@/hooks/useLocale'

import { Accordion } from './Accordion'

export function AccordionDemo() {
  const en = useLocale() === 'en'
  const faq = en
    ? [
        {
          q: 'Is there a shipping fee?',
          a: 'Shipping is free on orders of 5,000 yen or more. Below that, it is a flat 500 yen nationwide.',
        },
        {
          q: 'Can I return an item?',
          a: 'We accept returns within 7 days of delivery, for unused items only.',
        },
        {
          q: 'What payment methods can I use?',
          a: 'We accept credit card, bank transfer, and cash on delivery.',
        },
      ]
    : [
        { q: '送料はかかりますか？', a: '5,000 円以上のご購入で送料無料です。それ未満は全国一律 500 円です。' },
        { q: '返品はできますか？', a: '到着後 7 日以内、未使用のものに限りお受けします。' },
        { q: '支払い方法は？', a: 'クレジットカード・銀行振込・代金引換に対応しています。' },
      ]

  return <Accordion items={faq} />
}
