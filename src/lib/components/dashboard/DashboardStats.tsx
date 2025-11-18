import { BookOpen, FileText } from 'lucide-react';
import { StatsCard } from '@/lib/components/dashboard/StatsCard';
import type { TotalCreations } from '@/user/types/totalCreations';

type DashboardStatsProps = {
  totalCreations: TotalCreations;
};

export function DashboardStats({ totalCreations }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatsCard
        title="Total Notes"
        value={totalCreations.notes}
        icon={FileText}
      />
      <StatsCard
        title="Total Flashcards"
        value={totalCreations.flashcards}
        icon={BookOpen}
      />
    </div>
  );
}
