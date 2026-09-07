import { useState } from "react";
import { Plus } from "lucide-react";

import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import DeleteExpenseModal from "../components/expenses/DeleteExpenseModal";

export default function Expenses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedExpense, setSelectedExpense] =
    useState(null);

  const expenses = [
    {
      id: 1,
      title: "Groceries",
      category: "Food",
      amount: 1000,
      date: "2026-09-07",
    },
    {
      id: 2,
      title: "Petrol",
      category: "Transport",
      amount: 800,
      date: "2026-09-06",
    },
  ];

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (!category || expense.category === category)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Expenses
        </h1>

        <button
          onClick={() => setShowForm(true)}
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
            console.log(data);
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
          onConfirm={(id) => {
            console.log("Delete", id);
            setShowDelete(false);
          }}
          onClose={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}