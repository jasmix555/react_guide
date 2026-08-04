import { Button } from './Button'

/** The live demo: the same Button component, three variants + a small size. */
export function ButtonVariants() {
  return (
    <>
      <Button variant="primary">購入する</Button>
      <Button variant="secondary">カートに入れる</Button>
      <Button variant="ghost">あとで見る</Button>
      <Button variant="primary" size="sm">
        小さいボタン
      </Button>
      <Button variant="secondary" disabled>
        品切れ
      </Button>
    </>
  )
}
