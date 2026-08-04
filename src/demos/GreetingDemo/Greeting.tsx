import styles from './Greeting.module.scss'

// props are received by destructuring — `role` even has a default value.
interface GreetingProps {
  name: string
  role?: string
}

export function Greeting({ name, role = 'メンバー' }: GreetingProps) {
  return (
    <div className={styles.card}>
      <span className={styles.name}>{name} さん</span>
      <span className={styles.role}>{role}</span>
    </div>
  )
}
