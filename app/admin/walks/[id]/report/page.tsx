import WalkReportForm from '@/components/forms/WalkReportForm';

export default async function WalkReportPage({ params }: { params: { id: string } }) {
  const walkId = await params.id;
  return <WalkReportForm walkId={walkId} />;
}