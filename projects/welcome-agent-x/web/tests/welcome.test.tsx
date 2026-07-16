import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '@/App';
import type { Agent } from '@/types';

const roster: Agent[] = [
  {
    id: 'frontend-engineer',
    name: 'Frontend Engineer',
    role: 'React.js frontend specialist for UI, components, and client-side behavior',
    status: 'idle',
  },
  {
    id: 'backend-engineer',
    name: 'Backend Engineer',
    role: 'Node.js backend specialist for APIs, server logic, and shared packages',
    status: 'working',
  },
  {
    id: 'qa-engineer',
    name: 'QA Engineer',
    role: 'Validates web changes and produces structured test evidence',
    status: 'idle',
  },
];

function mockAgentsOk(agents: Agent[] = roster) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ agents }),
    }),
  );
}

function mockAgentsFail() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }),
  );
}

describe('Welcome Agent X', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders brand-first hero and loads agents from the API', async () => {
    mockAgentsOk();
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Welcome Agent X' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Meet the team' }),
    ).toHaveAttribute('href', '#team');

    await waitFor(() => {
      expect(screen.getByTestId('agent-list')).toBeInTheDocument();
    });

    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('QA Engineer')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/agents');
  });

  it('shows a personalized greeting when an agent is selected', async () => {
    mockAgentsOk();
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /Frontend Engineer/i }));

    const greeting = screen.getByTestId('agent-greeting');
    expect(
      within(greeting).getByText(/Hello, Frontend Engineer — glad you’re here\./),
    ).toBeInTheDocument();
    expect(
      within(greeting).getByText(
        'React.js frontend specialist for UI, components, and client-side behavior',
      ),
    ).toBeInTheDocument();
  });

  it('filters agents by specialty keyword', async () => {
    mockAgentsOk();
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText('Filter by specialty')).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText('Filter by specialty'), 'security');
    expect(screen.getByTestId('empty-state')).toHaveTextContent(
      'No agents match that specialty.',
    );

    await user.clear(screen.getByLabelText('Filter by specialty'));
    await user.type(screen.getByLabelText('Filter by specialty'), 'frontend');
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
  });

  it('shows a recoverable error state when the API fails', async () => {
    mockAgentsFail();
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Couldn’t load the team.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Welcome Agent X' }),
    ).toBeInTheDocument();

    mockAgentsOk();
    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => {
      expect(screen.getByTestId('agent-list')).toBeInTheDocument();
    });
  });

  it('shows an empty state when the API returns no agents', async () => {
    mockAgentsOk([]);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toHaveTextContent(
        'No agents to show yet.',
      );
    });
  });
});
