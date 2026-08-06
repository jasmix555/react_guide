import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useReducedMotion } from 'motion/react'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import products from '@/data/products.json'
import { useLocale } from '@/hooks/useLocale'

import styles from './SwiperCarousel.module.scss'

/**
 * A product carousel commonly built in real projects. Add features via modules,
 * and change the number of slides shown per screen width via breakpoints.
 * Autoplay stops when "reduce motion" is enabled (reduced-motion consideration).
 */
export function SwiperCarousel() {
  const en = useLocale() === 'en'
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
          <span className={styles.name}>{en ? p.nameEn : p.name}</span>
          <span className={styles.price}>
            {en ? `${p.price.toLocaleString()}` : `${p.price.toLocaleString()}円`}
          </span>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
