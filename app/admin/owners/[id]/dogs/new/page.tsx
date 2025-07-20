import NewDogForm from '@/components/forms/NewDogForm';

export default function NewDogPage({ params }: { params: { id: string } }) {
  const ownerId = params.id;
  return <NewDogForm ownerId={ownerId} />;
}