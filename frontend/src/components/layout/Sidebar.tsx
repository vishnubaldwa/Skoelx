import {
  LayoutDashboard,
  Package,
  Users,
  KeyRound,
  Settings,
  Shield,
} from "lucide-react";

import MenuItem from "./MenuItem";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-950">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-white">
          SKOELX
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Enterprise ERP
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        <MenuItem
          to="/dashboard"
          title="Dashboard"
          icon={LayoutDashboard}
        />

        <MenuItem
          to="/products"
          title="Products"
          icon={Package}
        />

        <MenuItem
          to="/customers"
          title="Customers"
          icon={Users}
        />

        <MenuItem
          to="/licenses"
          title="Licenses"
          icon={KeyRound}
        />

        <MenuItem
          to="/users"
          title="Users"
          icon={Shield}
        />

        <MenuItem
          to="/settings"
          title="Settings"
          icon={Settings}
        />

      </nav>

      <div className="border-t border-slate-800 p-4">

        <div className="rounded-lg bg-slate-900 p-4">

          <div className="text-sm text-slate-400">
            Logged in as
          </div>

          <div className="font-semibold text-white">
            Super Admin
          </div>

        </div>

      </div>

    </aside>
  );
}