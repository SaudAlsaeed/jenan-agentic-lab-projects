import { useQuery } from '@tanstack/react-query';
import type { ContentPayload } from '@/types';

export const queryKeys = {
  content: ['content'] as const,
};

async function fetchContent(): Promise<ContentPayload> {
  const response = await fetch('/api/v1/content');
  if (!response.ok) {
    throw new Error(`Failed to load content (${response.status})`);
  }
  return response.json() as Promise<ContentPayload>;
}

export function useContent() {
  return useQuery({
    queryKey: queryKeys.content,
    queryFn: fetchContent,
  });
}
