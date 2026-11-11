export type Profile = {
  id: string;
  display_name: string;
  username: string;
  avatar_path: string | null;
  description: string | null;
  banner_path: string | null;
};

export type UpdateProfilePayload = {
  username?: string;
  display_name?: string;
  avatar_path?: string | null;
  description?: string | null;
  banner_path?: string | null;
};
