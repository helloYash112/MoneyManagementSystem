export default function DeleteLoanModal({
  loan,
  onConfirm,
  onClose,
}) {
  if (!loan) return null;

  const remainingAmount =
    Number(loan.amountLent) -
    Number(loan.amountRepaid);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800">
          Delete Loan
        </h2>

        <p className="mt-3 text-slate-600">
          Are you sure you want to delete this loan?
        </p>

        <div className="mt-4 rounded-lg border bg-slate-50 p-4">
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">
                Amount Lent:
              </span>{" "}
              ₹{loan.amountLent}
            </p>

            <p>
              <span className="font-medium">
                Amount Repaid:
              </span>{" "}
              ₹{loan.amountRepaid}
            </p>

            <p>
              <span className="font-medium">
                Remaining:
              </span>{" "}
              ₹{remainingAmount}
            </p>

            <p>
              <span className="font-medium">
                Status:
              </span>{" "}
              {loan.status}
            </p>

            {loan.dueDate && (
              <p>
                <span className="font-medium">
                  Due Date:
                </span>{" "}
                {loan.dueDate}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(loan.id)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete Loan
          </button>
        </div>
      </div>
    </div>
  );
}