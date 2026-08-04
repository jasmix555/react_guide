import { Accordion } from './Accordion'

const faq = [
  { q: '送料はかかりますか？', a: '5,000 円以上のご購入で送料無料です。それ未満は全国一律 500 円です。' },
  { q: '返品はできますか？', a: '到着後 7 日以内、未使用のものに限りお受けします。' },
  { q: '支払い方法は？', a: 'クレジットカード・銀行振込・代金引換に対応しています。' },
]

export function AccordionDemo() {
  return <Accordion items={faq} />
}
