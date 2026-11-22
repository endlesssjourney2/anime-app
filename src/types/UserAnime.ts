export type WatchStatus = "watching" | "completed" | "planned" | "on_hold" | "dropped";

export type UserAnime = {
  id: number;
  user_id: string;
  anime_id: number;
  is_favorite: boolean;
  watch_status: WatchStatus | null;
  created_at: string;
};
