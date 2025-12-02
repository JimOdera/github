// app/activities/[id]/page.tsx
import ActivityDetailWrapper from '../components/ActivityDetailWrapper';
import { notFound } from 'next/navigation';

export default function ActivityDetail() {
  return <ActivityDetailWrapper />;
}