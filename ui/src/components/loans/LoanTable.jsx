import {
  Pencil,
  Trash2,
  Wallet,
} from "lucide-react";

export default function LoanTable({
  loans,
  onEdit,
  onDelete,
  onRepay,
}) {
  const badgeClass = {
    PENDING:
      "bg-yellow-100 text-yellow-700",
    PARTIAL:
      "bg-blue-100 text-blue-700",
    SETTLED:
      "bg-green-100 text-green-700",
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4">Lent</th>
            <th className="p-4">Repaid</th>
            <th className="p-4">Remaining</th>
            <th className="p-4">Due Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className="border-t"
            >
              <td className="p-4">
                ₹{loan.amountLent}
              </td>

              <td className="p-4">
                ₹{loan.amountRepaid}
              </td>

              <td className="p-4">
                ₹
                {loan.amountLent -
                  loan.amountRepaid}
              </td>

              <td className="p-4">
                {loan.dueDate}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${badgeClass[loan.status]}`}
                >
                  {loan.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      onRepay(loan)
                    }
                    className="text-green-600"
                  >
                    <Wallet size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onEdit(loan)
                    }
                    className="text-blue-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(loan)
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