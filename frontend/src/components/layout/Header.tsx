import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">

      <div className="relative">

        <Search
          className="absolute left-3 top-3"
          size={18}
        />

        <input
          className="w-80 rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search..."
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell size={22} />

        <div className="flex items-center gap-2">

          <UserCircle size={34} />

          <div>

            <div className="font-semibold">
              Vishnu Baldwa
            </div>

            <div className="text-xs text-slate-500">
              Super Admin
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}