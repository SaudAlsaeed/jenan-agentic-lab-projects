import type { ActivityEvent } from '@/types';

const now = Date.now();

export const activityMock: ActivityEvent[] = [
  {
    id: 'act-1',
    actorName: 'Backend Engineer',
    actorInitials: 'BE',
    action: 'started',
    target: 'JEN-4: Jenan Lab Hub',
    timestamp: new Date(now - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-2',
    actorName: 'Bohan',
    actorInitials: 'BO',
    action: 'reviewed',
    target: 'PR #12: inbox fix',
    timestamp: new Date(now - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-3',
    actorName: 'Multica Helper',
    actorInitials: 'MH',
    action: 'closed',
    target: 'JEN-3: Agent onboarding',
    timestamp: new Date(now - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-4',
    actorName: 'Backend Engineer',
    actorInitials: 'BE',
    action: 'commented on',
    target: 'JEN-10: Inbox performance',
    timestamp: new Date(now - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-5',
    actorName: 'Sarah',
    actorInitials: 'SA',
    action: 'created',
    target: 'JEN-9: Onboarding guide',
    timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-6',
    actorName: 'Mike',
    actorInitials: 'MI',
    action: 'updated',
    target: 'staging deploy config',
    timestamp: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-7',
    actorName: 'Multica Helper',
    actorInitials: 'MH',
    action: 'assigned',
    target: 'JEN-4 to Backend Squad',
    timestamp: new Date(now - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-8',
    actorName: 'Bohan',
    actorInitials: 'BO',
    action: 'approved',
    target: 'JEN-2: Repo binding',
    timestamp: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-9',
    actorName: 'Backend Engineer',
    actorInitials: 'BE',
    action: 'merged',
    target: 'PR #10: web scaffold',
    timestamp: new Date(now - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-10',
    actorName: 'Saud',
    actorInitials: 'SA',
    action: 'created',
    target: 'Web project in lab',
    timestamp: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function resetActivityMock(): ActivityEvent[] {
  return structuredClone(activityMock);
}

let activityData = structuredClone(activityMock);

export function getActivityData(): ActivityEvent[] {
  return activityData;
}

export function reseedActivity(): void {
  activityData = resetActivityMock();
}
