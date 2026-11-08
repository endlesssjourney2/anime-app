import { DropdownMenu } from "radix-ui";
import s from "./ProfileImageDropdown.module.css";
import { IconCamera, IconPhotoEdit, IconTrash } from "@tabler/icons-react";
import type { FC } from "react";

type Props = {
  changeImage: () => void;
  removeImage: () => void;
  hasImage: boolean;
  loading: boolean;
};

const ProfileImageDropdown: FC<Props> = ({
  changeImage,
  removeImage,
  hasImage,
  loading,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={s.trigger}
          aria-label="Image options"
          disabled={loading}
        >
          <IconCamera size={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} align="end" sideOffset={8}>
          <DropdownMenu.Item className={s.item} onSelect={changeImage}>
            <IconPhotoEdit size={17} />
            {hasImage ? "Change Image" : "Upload image"}
          </DropdownMenu.Item>

          {hasImage && (
            <>
              <DropdownMenu.Separator className={s.separator} />
              <DropdownMenu.Item
                className={`${s.item} ${s.remove}`}
                onSelect={removeImage}
                disabled={!hasImage}
              >
                <IconTrash size={17} />
                Remove image
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileImageDropdown;
