export default function LoanFilters({
  status,
  setStatus,
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="rounded-lg border px-4 py-2"
      >
        <option value="ALL">All</option>
        <option value="PENDING">
          Pending
        </option>
        <option value="PARTIAL">
          Partial
        </option>
        <option value="SETTLED">
          Settled
        </option>
      </select>
    </div>
  );
}