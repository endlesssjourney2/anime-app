import { useEffect, useState } from "react";
import type { Profile } from "../types/Profile";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile, uploadAvatar } from "../api/supabase/profile";

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

  const editName = async (newName: string) => {
    if (!user) return;
    setActionLoading(true);

    try {
      const data = await updateProfile(user.id, { display_name: newName });
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

  return { profile, initLoading, actionLoading, editAvatar, editName };
};

export default useProfile;
