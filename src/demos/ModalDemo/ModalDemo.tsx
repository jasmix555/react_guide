import { useState } from 'react'

import { Button } from '@/demos/ButtonVariants'

import { Modal } from './Modal'

export function ModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>モーダルを開く</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="購入の確認">
        <p>この商品をカートに追加しますか？</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => setOpen(false)}>追加する</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            やめる
          </Button>
        </div>
      </Modal>
    </>
  )
}
