export type Profile = {
  id: string;
  display_name: string;
  avatar_path: string | null;
  description: string | null;
  banner_path: string | null;
};

export type UpdateProfilePayload = {
  display_name?: string;
  avatar_path?: string | null;
  description?: string | null;
  banner_path?: string | null;
};
