export type MemorieType = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  event_date: Date | string;
  image: string | null;
  /** Write-only: pass a URL to set the cover, or null to explicitly clear it. */
  image_url?: string | null;
};
