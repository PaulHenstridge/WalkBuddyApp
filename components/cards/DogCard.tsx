
import Link from 'next/link'
import styles from './DogCard.module.css'


import { Dog } from '@/types/dog';


export default function DogCard({ dog }: { dog: Dog }) {

    function getAgeParts(dob: string): { years: number; months: number } {
        const birthDate = new Date(dob)
        const today = new Date()
      
        let years = today.getFullYear() - birthDate.getFullYear()
        let months = today.getMonth() - birthDate.getMonth()
      
        if (today.getDate() < birthDate.getDate()) {
          months--
        }
      
        if (months < 0) {
          years--
          months += 12
        }
      
        return { years, months }
    }
      
    function formatBirthday(dob: string): string {
        const date = new Date(dob)
        return date.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
        })
    }
      
    const { years, months } = getAgeParts(dog.dateOfBirth)
    const birthday = formatBirthday(dog.dateOfBirth)

  return (
    <div className={styles.card}>
      <div className={styles.header}>{dog.name} ({years})</div>
      <div className={styles.subText}>{dog.breed}</div>
      <div className={styles.subText}> {dog.description}</div>
    <div className={styles.subText}>Birthday: {birthday}</div>
      <Link href={`/admin/dogs/${dog.id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  )
}
