import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/shell/AppLayout';
import { AgentsPage } from '@/pages/Agents';
import { IssuesPage } from '@/pages/Issues';
import { OverviewPage } from '@/pages/Overview';
import { ProjectsPage } from '@/pages/Projects';
import { SettingsPage } from '@/pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'issues', element: <IssuesPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
