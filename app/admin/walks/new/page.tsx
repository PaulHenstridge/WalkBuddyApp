
import NewWalkForm from '@/components/forms/NewWalkForm';
import { Location } from '@/types/location';
import { Dog } from '@/types/dog';

export default async function NewWalkPage() {
  const [locRes, dogRes] = await Promise.all([
    fetch('http://localhost:3000/api/dbAPI/locations', { cache: 'no-store' }),
    fetch('http://localhost:3000/api/dbAPI/dogs',      { cache: 'no-store' }),
  ]);

  if (!locRes.ok || !dogRes.ok) {
    // If either call fails, throw an error
    
    throw new Error('Failed to load locations or dogs');
  }

  // Parse JSON into the expected DTO shapes:
  const locations: Location[] = await locRes.json();
  const dogs: Dog[]       = await dogRes.json();

  // Pass them down to the client‐side form
  return <NewWalkForm locations={locations} dogs={dogs} />;
}
