import { useEffect, useState } from "react";
import type { Profile, UpdateProfilePayload } from "../types/Profile";
import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadBanner,
} from "../api/supabase/profile";

const useProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initLoading, setInitLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setProfile(null);
      setInitLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setInitLoading(true);
      try {
        const data = await getProfile(user.id);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setInitLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading]);

  const editProfile = async (
    payload: Omit<UpdateProfilePayload, "avatar_url" | "banner_url">,
  ) => {
    if (!user) return;
    setActionLoading(true);

    try {
      const data = await updateProfile(user.id, payload);
      setProfile(data);
    } finally {
      setActionLoading(false);
    }
  };

  const editAvatar = async (file: File) => {
    if (!user) return;
    setActionLoading(true);

    try {
      const avatarUrl = await uploadAvatar(user.id, file);
      const data = await updateProfile(user.id, { avatar_url: avatarUrl });
      setProfile(data);
    } finally {
      setActionLoading(false);
    }
  };

  const editBanner = async (file: File) => {
    if (!user) return;
    setActionLoading(true);

    try {
      const bannerUrl = await uploadBanner(user.id, file);
      const data = await updateProfile(user.id, { banner_url: bannerUrl });
      setProfile(data);
    } finally {
      setActionLoading(false);
    }
  };

  return { profile, initLoading, actionLoading, editAvatar, editProfile, editBanner };
};

export default useProfile;
