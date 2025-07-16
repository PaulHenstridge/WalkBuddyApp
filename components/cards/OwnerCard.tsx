import Link from 'next/link'
import styles from './OwnerCard.module.css'

import { Owner } from '@/types/owner'

export default function OwnerCard({ owner }: { owner: Owner }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{owner.name}</div>
      <div className={styles.subText}>Address: {owner.contactDetails.address}</div>
      <div className={styles.subText}>Email: {owner.contactDetails.email}</div>
      <div className={styles.subText}>Phone: {owner.contactDetails.phoneNumber}</div>
      <Link href={`/admin/owners/${owner.id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  )
}
