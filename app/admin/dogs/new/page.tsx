// app/admin/dogs/new/page.tsx
import SelectOwnerForDog from '@/components/forms/SelectOwnerForDog';
import { Owner } from '@/types/owner';

export default async function NewDogEntry() {
  // 1) Fetch all owners
  const res = await fetch('http://localhost:3000/api/dbAPI/owners', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to load owners');
  }

  const owners: Owner[] = await res.json();

  // 2) Pass owners to the client-side form
  return <SelectOwnerForDog owners={owners} />;
}
