import { Search } from "lucide-react";

export default function CategoryFilters({
  search,
  setSearch,
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border py-2 pl-10 pr-3"
        />
      </div>
    </div>
  );
}