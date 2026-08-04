import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useReducedMotion } from 'motion/react'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import products from '@/data/products.json'

import styles from './SwiperCarousel.module.scss'

/**
 * 実務でよく作る商品カルーセル。modules で機能を足し、breakpoints で画面幅ごとに
 * 表示枚数を変える。自動再生は「動きを減らす」設定のとき止める（reduced-motion 配慮）。
 */
export function SwiperCarousel() {
  const reduce = useReducedMotion()
  const items = products.slice(0, 8)

  return (
    <Swiper
      className={styles.swiper}
      modules={[Navigation, Pagination, Autoplay, A11y]}
      spaceBetween={16}
      slidesPerView={1.1}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={reduce ? false : { delay: 2600, disableOnInteraction: false }}
      breakpoints={{
        520: { slidesPerView: 2 },
        820: { slidesPerView: 3 },
      }}
    >
      {items.map((p) => (
        <SwiperSlide key={p.id} className={styles.slide}>
          <span className={styles.name}>{p.name}</span>
          <span className={styles.price}>{p.price.toLocaleString()}円</span>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
