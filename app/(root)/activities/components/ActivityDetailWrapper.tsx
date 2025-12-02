// app/activities/components/ActivityDetailWrapper.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Import all detail components
import SocialImpactActivityDetail from './SocialImpactActivityDetail';
import EnvironmentalImpactActivityDetail from './EnvironmentalImpactActivityDetail';
import StakeholderWebinarDetail from './StakeholderWebinarDetail';
import MaterialTopicsDetail from './MaterialTopicsDetail';
import HumanRightsDetail from './HumanRightsDetail';
import WasteManagementDetail from './WasteManagementDetail';
import ESComplianceDetail from './ESComplianceDetail';
import CustomMetricTrackerDetail from './CustomMetricTrackerDetail';
import ProcurementSpendDiversityDetail from './ProcurementSpendDiversityDetail';

const categoryToComponent: Record<string, React.FC<any>> = {
  'Social Impact': SocialImpactActivityDetail,
  'Environmental Metrics': EnvironmentalImpactActivityDetail,
  'Stakeholder Engagement': StakeholderWebinarDetail,
  'Material Topic': MaterialTopicsDetail,
  'Human Rights': HumanRightsDetail,
  'Waste & Circular Economy': WasteManagementDetail,
  'E&S Compliance': ESComplianceDetail,
  'Custom Metric Tracker': CustomMetricTrackerDetail,
  'Procurement Spend Diversity': ProcurementSpendDiversityDetail,
  'IFRS S1 &S2 Alignment Tracking': CustomMetricTrackerDetail,
};

export default function ActivityDetailWrapper() {
  const { id } = useParams();
  const [activity, setActivity] = useState<any>(null);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (!id) return;

    // Load from submitted first
    const submittedStr = localStorage.getItem('submittedActivities');
    let found = null;

    if (submittedStr) {
      const submitted = JSON.parse(submittedStr);
      found = submitted.find((a: any) => a.id === id);
    }

    // If not submitted, try draft
    if (!found) {
      const step1Str = localStorage.getItem(`activityDraft_${id}_step1`);
      const step2Str = localStorage.getItem(`activityDraft_${id}_step2`);
      if (step1Str) {
        const step1 = JSON.parse(step1Str);
        const step2 = step2Str ? JSON.parse(step2Str) : {};
        found = { overview: step1, activityDetails: step2, status: 'Draft' };
      }
    }

    if (found) {
      setActivity(found);
      const cat = found.activityDetails?.selectedCategory || 'Unknown';
      setCategory(cat);
    }
  }, [id]);

  if (!activity || !category) {
    return <div className="p-10 text-center">Loading activity...</div>;
  }

  const DetailComponent = categoryToComponent[category] || (() => <div>Unsupported category: {category}</div>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/20 to-[#B1CA69]/20">
      <DetailComponent activity={activity} id={id} />
    </div>
  );
}