import { useForm } from "react-hook-form";

export default function RepaymentModal({
  loan,
  onSubmit,
  onClose,
}) {
  const { register, handleSubmit } =
    useForm();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <h2 className="font-semibold">
          Register Repayment
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-4"
        >
          <input
            type="number"
            step="0.01"
            {...register(
              "repaymentAmount"
            )}
            placeholder="Repayment Amount"
            className="w-full rounded-lg border p-3"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button className="rounded-lg bg-green-600 px-4 py-2 text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}