import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    ongoing: 0,
    completed: 0,
    pendingInvoices: 0,
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project stats (Dummy Data for Now)
    setStats({ ongoing: 5, completed: 10, pendingInvoices: 3 });
    setProjects([
      { name: "Wedding Shoot", type: "Photography", status: "Ongoing" },
      { name: "Birthday Album", type: "Editing", status: "Completed" },
      { name: "Commercial Ad", type: "Full", status: "Ongoing" },
    ]);
  }, []);

  // Convert status into numerical values for the BarChart
  const chartData = projects.map((project) => ({
    name: project.name,
    statusValue:
      project.status === "Ongoing" ? 1 : project.status === "Completed" ? 2 : 0,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Ongoing Projects</h2>
          <p className="text-3xl font-bold">{stats.ongoing}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Completed Projects</h2>
          <p className="text-3xl font-bold">{stats.completed}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Pending Invoices</h2>
          <p className="text-3xl font-bold">{stats.pendingInvoices}</p>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Project Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="statusValue" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Add New Project Button */}
      <div className="mt-6 gap-4 flex justify-center">
        <Link to="/projects">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            My Project's Table
          </button>
        </Link>
        <Link to="/invoices">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Invoice Generation Page
          </button>
        </Link>
      </div>
    </div>
  );
}
