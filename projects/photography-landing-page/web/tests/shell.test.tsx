import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Shell } from '@/pages/Shell';

describe('RTL shell scaffold', () => {
  it('renders Arabic wordmark placeholder', () => {
    render(<Shell />);
    expect(screen.getAllByText('[اسم الاستوديو]').length).toBeGreaterThan(0);
  });

  it('exposes a main landmark for skip link', () => {
    render(<Shell />);
    expect(document.getElementById('main')).toBeTruthy();
  });
});
