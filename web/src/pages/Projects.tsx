import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Bot, Globe, Server } from 'lucide-react';
import { useProjects } from '@/api/client';
import { TopBar } from '@/components/shell/TopBar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Project, ProjectStatus } from '@/types';

const iconMap = {
  globe: Globe,
  server: Server,
  bot: Bot,
  book: Book,
} as const;

const statusVariant: Record<ProjectStatus, 'default' | 'accent' | 'success'> = {
  planned: 'default',
  in_progress: 'accent',
  done: 'success',
};

type Filter = 'all' | ProjectStatus;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'planned', label: 'Planned' },
  { value: 'done', label: 'Done' },
];

export function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (filter === 'all') return projects;
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  return (
    <>
      <TopBar title="Projects" subtitle="Lab projects and their health" />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.icon as keyof typeof iconMap] ?? Globe;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start gap-3">
        <div className="rounded-lg bg-accent-muted p-2 text-accent">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <CardTitle className="text-base">{project.name}</CardTitle>
          <Badge variant={statusVariant[project.status]} className="mt-2">
            {project.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {project.issueCount} issues · Lead: {project.leadName}
          </span>
          {project.name === 'Web' && (
            <Link
              to="/issues"
              className="font-medium text-accent hover:underline"
            >
              View issues →
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
