/** API origin for local Welcome Agent X (default matches api README). */
export const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, '') || 'http://localhost:3001';
