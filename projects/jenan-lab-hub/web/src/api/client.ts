import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getActivityData } from '@/api/mocks/activity';
import { getAgentsData } from '@/api/mocks/agents';
import { getIssuesData, setIssuesData } from '@/api/mocks/issues';
import { getProjectsData } from '@/api/mocks/projects';
import { reseedAllMocks, simulateFetch } from '@/api/mocks/index';
import type {
  Agent,
  ActivityEvent,
  ChartDataPoint,
  Issue,
  IssueStatus,
  KpiStats,
  Project,
} from '@/types';

export const queryKeys = {
  agents: ['agents'] as const,
  projects: ['projects'] as const,
  issues: ['issues'] as const,
  activity: ['activity'] as const,
  kpis: ['kpis'] as const,
  issueTrend: ['issueTrend'] as const,
  agentStatus: ['agentStatus'] as const,
};

async function fetchAgents(): Promise<Agent[]> {
  return simulateFetch(getAgentsData());
}

async function fetchProjects(): Promise<Project[]> {
  return simulateFetch(getProjectsData());
}

async function fetchIssues(): Promise<Issue[]> {
  return simulateFetch(getIssuesData());
}

async function fetchActivity(): Promise<ActivityEvent[]> {
  return simulateFetch(getActivityData());
}

async function fetchKpis(): Promise<KpiStats> {
  const [agents, issues, projects] = await Promise.all([
    fetchAgents(),
    fetchIssues(),
    fetchProjects(),
  ]);

  return simulateFetch({
    activeAgents: agents.filter((a) => a.status === 'running').length,
    openIssues: issues.filter((i) => i.status !== 'done').length,
    projectsInProgress: projects.filter((p) => p.status === 'in_progress').length,
    tasksCompleted7d: issues.filter((i) => i.status === 'done').length + 3,
  });
}

async function fetchIssueTrend(): Promise<ChartDataPoint[]> {
  return simulateFetch([
    { name: 'Mon', value: 2 },
    { name: 'Tue', value: 4 },
    { name: 'Wed', value: 3 },
    { name: 'Thu', value: 6 },
    { name: 'Fri', value: 5 },
    { name: 'Sat', value: 1 },
    { name: 'Sun', value: 3 },
  ]);
}

async function fetchAgentStatusChart(): Promise<ChartDataPoint[]> {
  const agents = await fetchAgents();
  const counts = { idle: 0, running: 0, blocked: 0 };
  for (const agent of agents) {
    counts[agent.status]++;
  }
  return simulateFetch([
    { name: 'Idle', value: counts.idle },
    { name: 'Running', value: counts.running },
    { name: 'Blocked', value: counts.blocked },
  ]);
}

export function useAgents() {
  return useQuery({ queryKey: queryKeys.agents, queryFn: fetchAgents });
}

export function useProjects() {
  return useQuery({ queryKey: queryKeys.projects, queryFn: fetchProjects });
}

export function useIssues() {
  return useQuery({ queryKey: queryKeys.issues, queryFn: fetchIssues });
}

export function useActivity() {
  return useQuery({ queryKey: queryKeys.activity, queryFn: fetchActivity });
}

export function useKpis() {
  return useQuery({ queryKey: queryKeys.kpis, queryFn: fetchKpis });
}

export function useIssueTrend() {
  return useQuery({ queryKey: queryKeys.issueTrend, queryFn: fetchIssueTrend });
}

export function useAgentStatusChart() {
  return useQuery({
    queryKey: queryKeys.agentStatus,
    queryFn: fetchAgentStatusChart,
  });
}

export function useUpdateIssueStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      issueId,
      status,
    }: {
      issueId: string;
      status: IssueStatus;
    }) => {
      const issues = getIssuesData();
      const updated = issues.map((issue) =>
        issue.id === issueId ? { ...issue, status } : issue,
      );
      setIssuesData(updated);
      return simulateFetch(updated.find((i) => i.id === issueId)!);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.issues });
      void queryClient.invalidateQueries({ queryKey: queryKeys.kpis });
    },
  });
}

export function useReorderIssuesInColumn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      status,
      orderedIds,
    }: {
      status: IssueStatus;
      orderedIds: string[];
    }) => {
      const issues = getIssuesData();
      const updated = issues.map((issue) => {
        if (issue.status !== status) return issue;
        const order = orderedIds.indexOf(issue.id);
        return order >= 0 ? { ...issue, columnOrder: order } : issue;
      });
      setIssuesData(updated);
      return simulateFetch(updated);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.issues });
    },
  });
}

export function useResetDemoData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      reseedAllMocks();
      await simulateFetch(true);
      return true;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries();
    },
  });
}
