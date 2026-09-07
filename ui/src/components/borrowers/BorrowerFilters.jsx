import { Search } from "lucide-react";

export default function BorrowerFilters({
  search,
  setSearch,
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search borrower..."
          className="w-full rounded-lg border py-2 pl-10 pr-3"
        />
      </div>
    </div>
  );
}