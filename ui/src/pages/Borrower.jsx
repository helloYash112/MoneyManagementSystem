// src/pages/Borrowers.jsx

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import BorrowerFilters from "../components/borrowers/BorrowerFilters";
import BorrowerForm from "../components/borrowers/BorrowerForm";
import BorrowerTable from "../components/borrowers/BorrowerTable";
import DeleteBorrowerModal from "../components/borrowers/DeleteBorrowerModal";

import {
  fetchBorrowers,
  createBorrower,
  deleteBorrower,
} from "../features/borrower/borrowerSlice";

import { useNavigate } from "react-router-dom";

export default function Borrower() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useSelector((state) => state.user);

  const { borrowers, loading } = useSelector(
    (state) => state.borrower,
  );

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedBorrower, setSelectedBorrower] =
    useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBorrowers(userId));
    }
  }, [dispatch, userId]);

  const filteredBorrowers = useMemo(() => {
    return borrowers.filter((borrower) =>
      borrower.name
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [borrowers, search]);

  const handleCreateBorrower = async (data) => {
    await dispatch(
      createBorrower({
        ...data,
        userId,
      }),
    );

    setShowForm(false);
  };

  const handleDeleteBorrower = async (id) => {
    await dispatch(deleteBorrower(id));

    setShowDelete(false);
    setSelectedBorrower(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Borrowers
          </h1>

          <p className="text-slate-500">
            Manage your borrower contacts
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Borrower
        </button>
      </div>

      {/* Search */}

      <BorrowerFilters
        search={search}
        setSearch={setSearch}
      />

      {/* Table */}

      <BorrowerTable
        borrowers={filteredBorrowers}
        onViewLoans={(borrowerId) =>
          navigate(`/loans/${borrowerId}`)
        }
        onDelete={(borrower) => {
          setSelectedBorrower(borrower);
          setShowDelete(true);
        }}
      />

      {/* Loading */}

      {loading && (
        <div className="text-center">
          Loading borrowers...
        </div>
      )}

      {/* Form */}

      {showForm && (
        <BorrowerForm
          onSubmit={handleCreateBorrower}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Delete Modal */}

      {showDelete && (
        <DeleteBorrowerModal
          borrower={selectedBorrower}
          onConfirm={handleDeleteBorrower}
          onClose={() => {
            setShowDelete(false);
            setSelectedBorrower(null);
          }}
        />
      )}
    </div>
  );
}