import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AgentsPage } from '@/pages/Agents';
import { ThemeProvider } from '@/components/ThemeProvider';

function renderAgents() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter>
          <AgentsPage />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

describe('AgentsPage', () => {
  it('renders seeded lab agents', async () => {
    renderAgents();
    await waitFor(() => {
      expect(screen.getByText('Multica Helper')).toBeInTheDocument();
    });
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Bohan')).toBeInTheDocument();
  });

  it('opens agent detail drawer on row click', async () => {
    const user = userEvent.setup();
    renderAgents();
    await waitFor(() => {
      expect(screen.getByText('Bohan')).toBeInTheDocument();
    });
    await user.click(screen.getByText('Bohan'));
    expect(screen.getByText('Instructions excerpt')).toBeInTheDocument();
    expect(screen.getByText('code-review')).toBeInTheDocument();
  });

  it('sorts agents by name when header clicked', async () => {
    const user = userEvent.setup();
    renderAgents();
    await waitFor(() => {
      expect(screen.getByText('Multica Helper')).toBeInTheDocument();
    });
    await user.click(screen.getByRole('columnheader', { name: /Name/ }));
    const rows = screen.getAllByRole('button', { name: /View details for/ });
    expect(rows.length).toBeGreaterThan(0);
  });
});
