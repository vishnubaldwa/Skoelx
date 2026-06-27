import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface MenuItemProps {
  to: string;
  title: string;
  icon: LucideIcon;
}

export default function MenuItem({
  to,
  title,
  icon: Icon,
}: MenuItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon size={20} />

      <span>{title}</span>
    </NavLink>
  );
}