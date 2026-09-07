// src/pages/Loan.jsx

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import LoanTable from "../components/loans/LoanTable";
import LoanForm from "../components/loans/LoanForm";
import LoanFilters from "../components/loans/LoanFilters";
import RepaymentModal from "../components/loans/RepaymentModal";
import DeleteLoanModal from "../components/loans/DeleteLoanModal";

import {
  fetchLoansByBorrower,
  createLoan,
  updateLoan,
  registerRepayment,
  deleteLoan,
} from "../features/loan/loanSlice";

export default function Loan() {
  const dispatch = useDispatch();

  const { borrowerId } = useParams();

  const { loans, loading } = useSelector(
    (state) => state.loan,
  );

  const [status, setStatus] = useState("ALL");

  const [showForm, setShowForm] = useState(false);

  const [showRepaymentModal, setShowRepaymentModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedLoan, setSelectedLoan] =
    useState(null);

  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    if(borrowerId){
        dispatch(
        
      fetchLoansByBorrower(borrowerId),
    );

    }
    
  }, [dispatch, borrowerId]);

  const filteredLoans = useMemo(() => {
    if (status === "ALL") return loans;

    return loans.filter(
      (loan) => loan.status === status,
    );
  }, [loans, status]);

  const handleCreateLoan = async (data) => {
    await dispatch(createLoan(data));

    setShowForm(false);

    dispatch(
      fetchLoansByBorrower(borrowerId),
    );
  };

  const handleUpdateLoan = async (data) => {
    await dispatch(
      updateLoan({
        id: editLoan.id,
        loanData: data,
      }),
    );

    setEditLoan(null);
    setShowForm(false);
  };

  const handleRepayment = async (data) => {
    await dispatch(
      registerRepayment({
        id: selectedLoan.id,
        repaymentAmount:
          data.repaymentAmount,
      }),
    );

    setShowRepaymentModal(false);
    setSelectedLoan(null);
  };

  const handleDeleteLoan = async (id) => {
    await dispatch(deleteLoan(id));

    setShowDeleteModal(false);
    setSelectedLoan(null);
  };

  const totalLent = loans.reduce(
    (sum, loan) =>
      sum + Number(loan.amountLent),
    0,
  );

  const totalRepaid = loans.reduce(
    (sum, loan) =>
      sum + Number(loan.amountRepaid),
    0,
  );

  const outstanding =
    totalLent - totalRepaid;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Loans
          </h1>

          <p className="text-slate-500">
            Manage borrower loans
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Loan
        </button>
      </div>

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Lent
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            ₹{totalLent}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Repaid
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-600">
            ₹{totalRepaid}
          </h3>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Outstanding
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-500">
            ₹{outstanding}
          </h3>
        </div>
      </div>

      {/* Filters */}

      <LoanFilters
        status={status}
        setStatus={setStatus}
      />

      {/* Table */}

      <LoanTable
        loans={filteredLoans}
        onEdit={(loan) => {
          setEditLoan(loan);
          setShowForm(true);
        }}
        onRepay={(loan) => {
          setSelectedLoan(loan);
          setShowRepaymentModal(true);
        }}
        onDelete={(loan) => {
          setSelectedLoan(loan);
          setShowDeleteModal(true);
        }}
      />

      {loading && (
        <div className="text-center">
          Loading loans...
        </div>
      )}

      {/* Loan Form */}

      {showForm && (
        <LoanForm
          borrowerId={borrowerId}
          initialData={editLoan}
          onSubmit={
            editLoan
              ? handleUpdateLoan
              : handleCreateLoan
          }
          onClose={() => {
            setEditLoan(null);
            setShowForm(false);
          }}
        />
      )}

      {/* Repayment */}

      {showRepaymentModal && (
        <RepaymentModal
          loan={selectedLoan}
          onSubmit={handleRepayment}
          onClose={() => {
            setShowRepaymentModal(false);
            setSelectedLoan(null);
          }}
        />
      )}

      {/* Delete */}

      {showDeleteModal && (
        <DeleteLoanModal
          loan={selectedLoan}
          onConfirm={handleDeleteLoan}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedLoan(null);
          }}
        />
      )}
    </div>
  );
}