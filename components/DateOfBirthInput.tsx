import { useState } from 'react'
import styles from './DateOfBirthInput.module.css'

type DateOfBirthInputProps = {
  value?: string
  onChange: (formattedDate: string) => void
}

export default function DateOfBirthInput({ value, onChange }: DateOfBirthInputProps) {
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const today = new Date().toISOString().split('T')[0]

    if (rawValue > today) {
      setError('Date of birth cannot be in the future.')
    } else {
      setError('')
      onChange(rawValue) // already in yyyy-MM-dd format
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="dob" className={styles.label}>Date of Birth</label>
      <input
        id="dob"
        type="date"
        value={value}
        onChange={handleChange}
        className={styles.input}
        max={new Date().toISOString().split('T')[0]} // disables future dates
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
