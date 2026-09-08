import { Plus } from "lucide-react";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import DeleteExpenseModal from "../components/expenses/DeleteExpenseModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpensesByUser, createExpense, updateExpense, deleteExpense } from "../features/expense/expenseSlice";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Expenses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const { expenses, loading, error } = useSelector((state) => state.expense);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Fixed: Use fetchExpensesByUser to fetch a list of expenses, rather than fetchExpenseById
  useEffect(() => {
    if (userId) {
      dispatch(fetchExpensesByUser(userId));
    }
  }, [dispatch, userId]);

  // Fixed: Incorporated both search text and category selection into the filtering logic
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchLower = search.toLowerCase();

      // Match against description or category since 'title' doesn't exist in backend
      const matchesSearch =
        (expense.description && expense.description.toLowerCase().includes(searchLower)) ||
        (expense.category && expense.category.toLowerCase().includes(searchLower));

      const matchesCategory = category ? expense.category === category : true;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, category]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expenses</h1>

        <button
          onClick={() => {
            setEditExpense(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      <ExpenseFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={(expense) => {
          setEditExpense(expense);
          setShowForm(true);
        }}
        onDelete={(expense) => {
          setSelectedExpense(expense);
          setShowDelete(true);
        }}
      />

      {showForm && (
        <ExpenseForm
          initialData={editExpense}
          onSubmit={(data) => {
            if (editExpense) {
              // Fixed: Dispatch update action with ID and data
              dispatch(updateExpense({ id: editExpense.id || editExpense._id, ...data }));
            } else {
              // Fixed: Dispatch create action with payload and userId if needed
              dispatch(createExpense({ ...data, userId }));
            }
            setShowForm(false);
            setEditExpense(null);
          }}
          onClose={() => {
            setShowForm(false);
            setEditExpense(null);
          }}
        />
      )}

      {showDelete && (
        <DeleteExpenseModal
          expense={selectedExpense}
          onConfirm={() => {
            const expenseId = selectedExpense?.id || selectedExpense?._id;
            if (expenseId) {
              // Fixed: Dispatch delete action using the expense ID
              dispatch(deleteExpense(expenseId));
            }
            setShowDelete(false);
            setSelectedExpense(null);
          }}
          onClose={() => {
            setShowDelete(false);
            setSelectedExpense(null);
          }}
        />
      )}
    </div>
  );
}