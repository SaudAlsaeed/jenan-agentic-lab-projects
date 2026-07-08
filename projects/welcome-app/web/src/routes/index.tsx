import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/shell/AppLayout';
import { AgentDetailPage } from '@/pages/AgentDetail';
import { HomePage } from '@/pages/Home';
import { RosterPage } from '@/pages/Roster';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'agents', element: <RosterPage /> },
      { path: 'agents/:id', element: <AgentDetailPage /> },
    ],
  },
]);
