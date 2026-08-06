import { useState } from 'react'

import { Button } from '@/demos/ButtonVariants'
import { useLocale } from '@/hooks/useLocale'

import { Modal } from './Modal'

export function ModalDemo() {
  const en = useLocale() === 'en'
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>{en ? 'Open modal' : 'モーダルを開く'}</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={en ? 'Confirm purchase' : '購入の確認'}>
        <p>{en ? 'Add this item to your cart?' : 'この商品をカートに追加しますか？'}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setOpen(false)}>{en ? 'Add' : '追加する'}</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {en ? 'Cancel' : 'やめる'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
