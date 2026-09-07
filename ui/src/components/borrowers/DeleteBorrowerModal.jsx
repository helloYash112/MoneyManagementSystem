export default function DeleteBorrowerModal({
  borrower,
  onConfirm,
  onClose,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <h2 className="font-semibold">
          Delete Borrower
        </h2>

        <p className="mt-3">
          Delete {borrower?.name} ?
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onConfirm(borrower.id)
            }
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}