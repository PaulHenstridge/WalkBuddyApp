import Link from 'next/link'
import styles from './LocationCard.module.css'

import { Location } from '@/types/location'

export default function LocationCard({ location }: { location: Location }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{location.name}</div>
      <div className={styles.subText}>{location.w3wLocation}</div>
      <Link href={`/admin/locations/${location.id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  )
}
