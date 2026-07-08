import { useResetDemoData } from '@/api/client';
import { TopBar } from '@/components/shell/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { usePrefsStore } from '@/stores/prefs';
import type { SidebarDensity, ThemeMode } from '@/types';

export function SettingsPage() {
  const theme = usePrefsStore((s) => s.theme);
  const sidebarDensity = usePrefsStore((s) => s.sidebarDensity);
  const setTheme = usePrefsStore((s) => s.setTheme);
  const setSidebarDensity = usePrefsStore((s) => s.setSidebarDensity);
  const resetDemo = useResetDemoData();

  return (
    <>
      <TopBar title="Settings" subtitle="Preferences and demo data" />
      <main className="mx-auto max-w-2xl flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <fieldset>
              <legend className="sr-only">Theme selection</legend>
              <div className="flex flex-wrap gap-2">
                {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
                  <Button
                    key={mode}
                    variant={theme === mode ? 'primary' : 'secondary'}
                    onClick={() => setTheme(mode)}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>
            </fieldset>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sidebar density</CardTitle>
          </CardHeader>
          <CardContent>
            <fieldset>
              <legend className="sr-only">Sidebar density</legend>
              <div className="flex flex-wrap gap-2">
                {(['comfortable', 'compact'] as SidebarDensity[]).map((density) => (
                  <Button
                    key={density}
                    variant={sidebarDensity === density ? 'primary' : 'secondary'}
                    onClick={() => setSidebarDensity(density)}
                  >
                    {density.charAt(0).toUpperCase() + density.slice(1)}
                  </Button>
                ))}
              </div>
            </fieldset>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demo data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Reset all mock agents, projects, issues, and activity to their
              initial seed state.
            </p>
            <Button
              variant="danger"
              onClick={() => resetDemo.mutate()}
              disabled={resetDemo.isPending}
            >
              {resetDemo.isPending ? 'Resetting…' : 'Reset demo data'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
