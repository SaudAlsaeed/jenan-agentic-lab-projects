export type AgentStatus = 'idle' | 'running' | 'blocked';

export type IssueStatus =
  | 'backlog'
  | 'todo'
  | 'in_progress'
  | 'in_review'
  | 'done';

export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectStatus = 'planned' | 'in_progress' | 'done';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  currentTask: string | null;
  runtime: string;
  lastActive: string;
  instructionsExcerpt: string;
  skills: string[];
  recentTasks: string[];
  avatarInitials: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  issueCount: number;
  leadName: string;
  icon: string;
}

export interface IssueAssignee {
  type: 'agent' | 'squad';
  name: string;
}

export interface Issue {
  id: string;
  identifier: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: IssueAssignee;
  projectId: string;
  columnOrder: number;
}

export interface ActivityEvent {
  id: string;
  actorName: string;
  actorInitials: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface KpiStats {
  activeAgents: number;
  openIssues: number;
  projectsInProgress: number;
  tasksCompleted7d: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type SidebarDensity = 'comfortable' | 'compact';
