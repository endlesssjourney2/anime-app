import { IconX } from "@tabler/icons-react";
import { Dialog } from "radix-ui";
import s from "./DialogProfile.module.css";
import { useState, type FC } from "react";
import type { Profile, UpdateProfilePayload } from "../../../../types/Profile";
import { toast } from "sonner";

type Props = {
  profile: Profile;
  loading: boolean;
  onSave: (
    payload: Omit<UpdateProfilePayload, "avatar_path" | "banner_path">,
  ) => Promise<void>;
};

const DialogProfile: FC<Props> = ({ profile, loading, onSave }) => {
  const [name, setName] = useState(profile.display_name);
  const [description, setDescription] = useState(profile.description ?? "");
  const [username, setUsername] = useState(profile.username);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (loading) return;

    if (nextOpen) {
      setName(profile.display_name);
      setDescription(profile.description ?? "");
      setUsername(profile.username);
    }
    setOpen(nextOpen);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const normalizedName = name.trim();
    const normalizedDescription = description.trim();
    const normalizedUsername = username.trim().toLowerCase();

    const unchanged =
      normalizedName === profile.display_name &&
      normalizedDescription === (profile.description ?? "") &&
      normalizedUsername === profile.username;

    if (unchanged) {
      setOpen(false);
      toast("Nothing to save");
      return;
    }

    if (!/^[a-z0-9_]{3,20}$/.test(normalizedUsername)) {
      toast.error("Username must be 3–20 characters. Using only (a-z, 0-9, _)");
      return;
    }

    try {
      await onSave({
        display_name: normalizedName,
        description: normalizedDescription || null,
        username: normalizedUsername,
      });
      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button type="button" className={s.trigger}>
          Edit profile
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />

        <Dialog.Content className={s.content}>
          <div className={s.header}>
            <div>
              <Dialog.Title className={s.title}>Edit profile</Dialog.Title>

              <Dialog.Description className={s.description}>
                Update your profile name and description.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className={s.close}
                aria-label="Close"
                disabled={loading}
              >
                <IconX size={18} />
              </button>
            </Dialog.Close>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={s.form}
          >
            <div className={s.field}>
              <label className={s.label} htmlFor="profile-name">
                Display name
              </label>

              <input
                className={s.input}
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={32}
                minLength={1}
                required
                disabled={loading}
                placeholder="Your display name"
              />

              <span className={s.counter}>{name.length}/32</span>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="profile-username">
                Username
              </label>

              <input
                className={s.input}
                id="profile-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                minLength={3}
                required
                disabled={loading}
                placeholder="Your username"
              />

              <span className={s.counter}>{username.length}/20</span>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="profile-description">
                About me
              </label>

              <textarea
                className={s.textarea}
                id="profile-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
                rows={4}
                disabled={loading}
                placeholder="Type something about yourself..."
              />

              <span className={s.counter}>{description.length}/300</span>
            </div>

            <div className={s.footer}>
              <Dialog.Close asChild>
                <button type="button" className={s.cancel} disabled={loading}>
                  Cancel
                </button>
              </Dialog.Close>

              <button type="submit" className={s.save} disabled={loading || !name.trim()}>
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogProfile;
