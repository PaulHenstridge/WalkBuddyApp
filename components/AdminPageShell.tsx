// PageShell.tsx
import styles from './AdminPageShell.module.css'

type PageShellProps = {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode 
}

export default function PageShell({ title, actions, children }: PageShellProps) {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {actions}
      </header>
      <section className={styles.section}>
        {children}
      </section>
    </div>
  )
}
