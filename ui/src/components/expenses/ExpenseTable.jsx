import { Pencil, Trash2 } from "lucide-react";

export default function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-t">
              <td className="p-4">
                {expense.description || <span className="text-gray-400 italic">No description</span>}
              </td>

              <td className="p-4">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                  {expense.category}
                </span>
              </td>

              <td className="p-4">{expense.expenseDate}</td>

              <td className="p-4 text-right font-semibold text-red-500">
                ₹{expense.amount}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="text-blue-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(expense)}
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