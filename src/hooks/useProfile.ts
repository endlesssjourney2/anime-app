import { useEffect, useState } from "react";
import type { Profile, UpdateProfilePayload } from "../types/Profile";
import { useAuth } from "../context/AuthContext";
import {
  deleteProfileImage,
  getProfile,
  getProfileImage,
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
    const oldPath = profile?.avatar_path;

    try {
      const path = await uploadAvatar(user.id, file);
      try {
        const data = await updateProfile(user.id, { avatar_path: path });
        setProfile(data);
      } catch (error) {
        await deleteProfileImage("avatars", path);
        throw error;
      }
      if (oldPath) {
        await deleteProfileImage("avatars", oldPath);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const editBanner = async (file: File) => {
    if (!user) return;

    setActionLoading(true);
    const oldPath = profile?.banner_path;

    try {
      const path = await uploadBanner(user.id, file);
      try {
        const data = await updateProfile(user.id, { banner_path: path });
        setProfile(data);
      } catch (error) {
        await deleteProfileImage("banners", path);
        throw error;
      }
      if (oldPath) {
        await deleteProfileImage("banners", oldPath);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const removeAvatar = async () => {
    if (!user) return;

    const path = profile?.avatar_path;
    if (!path) return;

    setActionLoading(true);

    try {
      const data = await updateProfile(user.id, { avatar_path: null });
      setProfile(data);

      await deleteProfileImage("avatars", path);
    } finally {
      setActionLoading(false);
    }
  };

  const removeBanner = async () => {
    if (!user) return;

    const path = profile?.banner_path;
    if (!path) return;

    setActionLoading(true);
    try {
      const data = await updateProfile(user.id, { banner_path: null });
      setProfile(data);

      await deleteProfileImage("banners", path);
    } finally {
      setActionLoading(false);
    }
  };

  const avatarUrl = getProfileImage("avatars", profile?.avatar_path);
  const bannerUrl = getProfileImage("banners", profile?.banner_path);

  return {
    profile,
    initLoading,
    actionLoading,
    editAvatar,
    editProfile,
    editBanner,
    avatarUrl,
    bannerUrl,
    removeAvatar,
    removeBanner,
  };
};

export default useProfile;
