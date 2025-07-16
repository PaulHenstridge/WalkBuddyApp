
import Link from 'next/link'
import styles from './DogCard.module.css'


import { Dog } from '@/types/dog';


export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{dog.name}</div>
      <div className={styles.subText}>{dog.breed}</div>
      <div className={styles.subText}> {dog.description}</div>
      <Link href={`/admin/dogs/${dog.id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  )
}
