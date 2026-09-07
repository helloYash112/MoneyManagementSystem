export default function DeleteExpenseModal({
  expense,
  onConfirm,
  onClose,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <h2 className="mb-3 text-lg font-semibold">
          Delete Expense
        </h2>

        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <strong>{expense?.title}</strong>?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(expense.id)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}