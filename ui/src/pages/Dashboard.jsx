const Dashboard = () => {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Expenses
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹15,000
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            This Month
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹5,000
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Today
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹350
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-xl font-semibold mb-4">
          Recent Transactions
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between border-b py-2">
            <span>Swiggy</span>
            <span className="text-red-500">
              - ₹250
            </span>
          </div>

          <div className="flex justify-between border-b py-2">
            <span>Petrol</span>
            <span className="text-red-500">
              - ₹1000
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span>Movie</span>
            <span className="text-red-500">
              - ₹300
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;