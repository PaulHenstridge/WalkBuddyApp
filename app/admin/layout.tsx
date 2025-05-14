
import React from 'react'
import Link from 'next/link'
import styles from './layout.module.css'

type AdminLayoutProps = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link href="/admin/owners" className={styles.navLink}>Owners</Link>
          <Link href="/admin/dogs" className={styles.navLink}>Dogs</Link>
          <Link href="/admin/locations" className={styles.navLink}>Locations</Link>
          <Link href="/admin/walks" className={styles.navLink}>Walks</Link>
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
