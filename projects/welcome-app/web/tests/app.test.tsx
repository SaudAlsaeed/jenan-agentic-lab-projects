import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { AppLayout } from '@/components/shell/AppLayout';
import { HomePage } from '@/pages/Home';
import { RosterPage } from '@/pages/Roster';
import { AgentDetailPage } from '@/pages/AgentDetail';
import type { ContentPayload } from '@/types';

const mockContent: ContentPayload = {
  owner: { name: 'craftersaud', title: 'Project Owner' },
  welcome: {
    eyebrow: 'Web Squad',
    headline: 'Welcome, craftersaud',
    subheadline:
      "You're the owner of this workspace. Meet the six teammates who plan, design, build, and validate your apps.",
    ctaLabel: 'Meet the Web Squad',
  },
  agents: [
    {
      id: 'team-lead',
      displayName: 'Team Lead',
      roleTitle: 'Squad coordination & delivery',
      avatarInitials: 'TL',
      responsibilities: 'Keeps delivery moving.',
      greeting: "I'm Team Lead. I keep Web Squad delivery moving.",
    },
    {
      id: 'business-analyst',
      displayName: 'Business Analyst',
      roleTitle: 'Requirements & acceptance criteria',
      avatarInitials: 'BA',
      responsibilities: 'Turns ideas into requirements.',
      greeting: "I'm Business Analyst. I turn fuzzy ideas into clear requirements.",
    },
  ],
};

function renderAt(path: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'agents', element: <RosterPage /> },
          { path: 'agents/:id', element: <AgentDetailPage /> },
        ],
      },
    ],
    { initialEntries: [path] },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('Welcome app routes', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockContent,
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows personalized welcome on home', async () => {
    renderAt('/');
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /welcome, craftersaud/i }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole('link', { name: /meet the web squad/i }),
    ).toHaveAttribute('href', '/agents');
  });

  it('lists agents on the roster', async () => {
    renderAt('/agents');
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /web squad/i })).toBeInTheDocument();
    });
    expect(
      screen.getByRole('link', { name: /team lead, squad coordination/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /business analyst, requirements/i }),
    ).toBeInTheDocument();
  });

  it('shows agent detail and not-found for unknown id', async () => {
    renderAt('/agents/team-lead');
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Team Lead' })).toBeInTheDocument();
    });
    expect(screen.getByText(/i'm team lead/i)).toBeInTheDocument();
  });

  it('shows not-found for unknown agent id', async () => {
    renderAt('/agents/unknown-agent');
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /agent not found/i })).toBeInTheDocument();
    });
  });
});
