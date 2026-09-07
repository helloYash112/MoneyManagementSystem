import { Search } from "lucide-react";

export default function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-3"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">
            Entertainment
          </option>
        </select>
      </div>
    </div>
  );
}