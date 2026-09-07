import { Trash2, HandCoins } from "lucide-react";

export default function BorrowerTable({
  borrowers,
  onDelete,
  onViewLoans,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Address</th>
            <th className="p-4 text-left">Notes</th>
            <th className="p-4 text-left">Created</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {borrowers.map((borrower) => (
            <tr
              key={borrower.id}
              className="border-t"
            >
              <td className="p-4">
                {borrower.name}
              </td>

              <td className="p-4">
                {borrower.phoneNumber}
              </td>

              <td className="p-4">
                {borrower.address}
              </td>

              <td className="p-4">
                {borrower.notes}
              </td>

              <td className="p-4">
                {new Date(
                  borrower.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      onViewLoans(borrower.id)
                    }
                    className="text-blue-600"
                  >
                    <HandCoins size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(borrower)
                    }
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}