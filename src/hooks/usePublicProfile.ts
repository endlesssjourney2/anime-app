import { useEffect, useState } from "react";
import type { Profile } from "../types/Profile";
import { getProfile, getProfileImage } from "../api/supabase/profile";

const usePublicProfile = (id?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initLoading, setInitLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setProfile(null);
      setInitLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setInitLoading(true);
      try {
        const data = await getProfile(id);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setInitLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const avatarUrl = getProfileImage("avatars", profile?.avatar_path ?? null);
  const bannerUrl = getProfileImage("banners", profile?.banner_path ?? null);

  return { profile, initLoading, avatarUrl, bannerUrl };
};

export default usePublicProfile;
