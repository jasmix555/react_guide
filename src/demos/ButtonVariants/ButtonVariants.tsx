import { useLocale } from '@/hooks/useLocale'

import { Button } from './Button'

/** The live demo: the same Button component, three variants + a small size. */
export function ButtonVariants() {
  const en = useLocale() === 'en'
  return (
    <>
      <Button variant="primary">{en ? 'Buy now' : '購入する'}</Button>
      <Button variant="secondary">{en ? 'Add to cart' : 'カートに入れる'}</Button>
      <Button variant="ghost">{en ? 'Save for later' : 'あとで見る'}</Button>
      <Button variant="primary" size="sm">
        {en ? 'Small button' : '小さいボタン'}
      </Button>
      <Button variant="secondary" disabled>
        {en ? 'Sold out' : '品切れ'}
      </Button>
    </>
  )
}
