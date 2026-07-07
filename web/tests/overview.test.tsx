import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { OverviewPage } from '@/pages/Overview';
import { ThemeProvider } from '@/components/ThemeProvider';

function renderOverview() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

describe('OverviewPage', () => {
  it('renders workspace hero strip', () => {
    renderOverview();
    expect(screen.getByText('Jenan-agentic-lab')).toBeInTheDocument();
    expect(screen.getByText('Team command center')).toBeInTheDocument();
  });

  it('shows KPI cards after data loads', async () => {
    renderOverview();
    await waitFor(() => {
      expect(screen.getByText('Active agents')).toBeInTheDocument();
    });
    expect(screen.getByText('Open issues')).toBeInTheDocument();
    expect(screen.getByText('Projects in progress')).toBeInTheDocument();
    expect(screen.getByText('Tasks completed (7d)')).toBeInTheDocument();
  });

  it('renders quick action navigation buttons', () => {
    renderOverview();
    expect(screen.getByRole('button', { name: 'New issue' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View agents' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open projects' })).toBeInTheDocument();
  });
});
