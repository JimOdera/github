// app/activities/[id]/page.tsx

import { notFound } from 'next/navigation';

// Import all detail components
import SocialImpactActivityDetail from '../components/SocialImpactActivityDetail';
import EnvironmentalImpactActivityDetail from '../components/EnvironmentalImpactActivityDetail';
import StakeholderWebinarDetail from '../components/StakeholderWebinarDetail';
import MaterialTopicsDetail from '../components/MaterialTopicsDetail';
import HumanRightsDetail from '../components/HumanRightsDetail';
import WasteManagementDetail from '../components/WasteManagementDetail';
import ESComplianceDetail from '../components/ESComplianceDetail';
import CustomMetricTrackerDetail from '../components/CustomMetricTrackerDetail';
import ProcurementSpendDiversityDetail from '../components/ProcurementSpendDiversityDetail';

// Map ID → Component + Title
const detailComponents: Record<string, { Component: React.FC; title: string }> = {
  '1': { Component: SocialImpactActivityDetail, title: 'Social Impact Activity' },
  '2': { Component: EnvironmentalImpactActivityDetail, title: 'Environmental Impact Activity' },
  '3': { Component: StakeholderWebinarDetail, title: 'Stakeholder Webinar' },
  '4': { Component: MaterialTopicsDetail, title: 'Material Topics' },
  '5': { Component: HumanRightsDetail, title: 'Human Rights' },
  '6': { Component: WasteManagementDetail, title: 'Waste Management' },
  '7': { Component: ESComplianceDetail, title: 'E&S Compliance' },
  '8': { Component: CustomMetricTrackerDetail, title: 'Custom Metric Tracker' },
  '9': { Component: ProcurementSpendDiversityDetail, title: 'Procurement Spend Diversity' },
};

// ← Make it async!
export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ id: string }>; // ← params is now a Promise
}) {
  const { id } = await params; // ← Await it

  const detail = detailComponents[id];

  if (!detail) {
    notFound();
  }

  const { Component } = detail;

  return <Component />;
}