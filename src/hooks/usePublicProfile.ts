import { useEffect, useState } from "react";
import type { Profile } from "../types/Profile";
import { getProfileByUsername, getProfileImage } from "../api/supabase/profile";

const usePublicProfile = (username?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setProfile(null);
      setInitLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setInitLoading(true);
      setProfile(null);
      try {
        const data = await getProfileByUsername(username);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setInitLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const avatarUrl = getProfileImage("avatars", profile?.avatar_path ?? null);
  const bannerUrl = getProfileImage("banners", profile?.banner_path ?? null);

  return { profile, initLoading, avatarUrl, bannerUrl };
};

export default usePublicProfile;
