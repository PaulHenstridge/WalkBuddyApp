import Link from 'next/link'
import styles from './WalkCard.module.css'

import { Walk } from '@/types/walk'

export default function WalkCard({ walk }: { walk: Walk }) {

    const cardClass = `${styles.card} ${walk.complete ? styles.complete : styles.pending}`;

  return (
    <div className={cardClass}>
      <div className={styles.header}>Walk ID: {walk.id}</div>
      <div className={styles.subText}>Location: {walk.location.name}</div>
      <div className={styles.subText}>Time: {new Date(walk.dateTime).toLocaleString()}</div>
      <div className={styles.subText}> {walk.complete ? "Complete" : "Pending"}</div>
      
      <Link href={`/admin/walks/${walk.id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  )
}
