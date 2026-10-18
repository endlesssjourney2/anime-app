import type { FC } from "react";
import type { CharacterRole } from "../../../types/Character";
import s from "./RoleBadge.module.css";
import { capitalizeFirst } from "../../../helpers/capitalizeFirst";

type Props = {
  role: CharacterRole;
};

const RoleBadge: FC<Props> = ({ role }) => {
  const capitalizeFirstRole = capitalizeFirst(role);

  return <span className={`${s.role} ${s[role]}`}>{capitalizeFirstRole}</span>;
};

export default RoleBadge;
