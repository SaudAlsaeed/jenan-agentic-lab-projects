import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InitialsBadge } from '@/components/ui/InitialsBadge';
import { cn } from '@/lib/utils';
import type { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  index?: number;
}

export function AgentCard({ agent, index = 0 }: AgentCardProps) {
  return (
    <Link
      to={`/agents/${agent.id}`}
      aria-label={`${agent.displayName}, ${agent.roleTitle}`}
      className={cn(
        'group flex min-h-11 items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] duration-150',
        'hover:border-accent/40 hover:shadow-md',
        'animate-fade-in',
      )}
      style={{ animationDelay: `${Math.min(index, 5) * 40}ms` }}
    >
      <InitialsBadge initials={agent.avatarInitials} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">
          {agent.displayName}
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">
          {agent.roleTitle}
        </span>
      </span>
      <ChevronRight
        className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent sm:hidden"
        aria-hidden="true"
      />
    </Link>
  );
}
