export type Profile = {
  id: string;
  display_name: string;
  avatar_url: string | null;
};

export type UpdateProfilePayload = {
  display_name?: string;
  avatar_url?: string | null;
};
