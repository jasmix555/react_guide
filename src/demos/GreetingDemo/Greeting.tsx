import { useLocale } from '@/hooks/useLocale'

import styles from './Greeting.module.scss'

// props are received by destructuring — `role` even has a default value.
interface GreetingProps {
  name: string
  role?: string
}

export function Greeting({ name, role }: GreetingProps) {
  const en = useLocale() === 'en'
  const displayRole = role ?? (en ? 'Member' : 'メンバー')
  return (
    <div className={styles.card}>
      <span className={styles.name}>{en ? name : `${name} さん`}</span>
      <span className={styles.role}>{displayRole}</span>
    </div>
  )
}
