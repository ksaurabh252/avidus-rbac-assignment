import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import {
  getAllUsersAPI,
  getAllTasksAPI,
  updateUserStatusAPI,
  deleteUserAPI,
  deleteTaskAPI,
  getActivityLogsAPI,
} from "../services/api";

const AdminDashboard = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("analytics");

  // Fetch all dashboard data
  const fetchData = useCallback(async () => {
    try {
      const usersRes = await getAllUsersAPI();
      const logsRes = await getActivityLogsAPI();
      const tasksRes = await getAllTasksAPI();

      setUsers(usersRes.data.data || usersRes.data);
      setTasks(tasksRes.data.tasks || tasksRes.data);
      setLogs(logsRes.data.data || logsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  }, []);

  // Load data when component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Toggle user active/inactive status
  const toggleUserStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    await updateUserStatusAPI(id, newStatus);
    fetchData();
  };

  // Delete a user after confirmation
  const handleDeleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteUserAPI(id);
      fetchData();
    }
  };

  // Delete a task after confirmation
  const handleDeleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      await deleteTaskAPI(id);
      fetchData();
    }
  };

  // Dashboard analytics calculations
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Dashboard tabs */}
        <div className="flex gap-4 mb-6 border-b pb-2">
          {["analytics", "users", "tasks", "logs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize font-semibold rounded-t ${activeTab === tab
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Analytics Section */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Users */}
            <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
              <p className="text-gray-500 text-sm uppercase">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>

            {/* Total Tasks */}
            <div className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
              <p className="text-gray-500 text-sm uppercase">Total Tasks</p>
              <p className="text-3xl font-bold">{tasks.length}</p>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
              <p className="text-gray-500 text-sm uppercase">
                Completed Tasks
              </p>
              <p className="text-3xl font-bold">{completedTasks}</p>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
              <p className="text-gray-500 text-sm uppercase">Pending Tasks</p>
              <p className="text-3xl font-bold">{pendingTasks}</p>
            </div>
          </div>
        )}

        {/* User Management Section */}
        {activeTab === "users" && (
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              {/* User table header */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              {/* User table body */}
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b">
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4 font-bold text-blue-600">{u.role}</td>

                    {/* User status badge */}
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${u.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                          }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    {/* User actions */}
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => toggleUserStatus(u._id, u.status)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm cursor-pointer"
                      >
                        Toggle Status
                      </button>

                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Task Monitoring Section */}
        {activeTab === "tasks" && (
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              {/* Task table */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Task Title</th>
                  <th className="p-4">Creator</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((t) => (
                  <tr key={t._id} className="border-b">
                    <td className="p-4 font-medium">{t.title}</td>
                    <td className="p-4">{t.createdBy?.name || "Unknown"}</td>

                    {/* Task completion status */}
                    <td className="p-4">
                      {t.completed ? (
                        <span className="text-green-600 font-bold">Done</span>
                      ) : (
                        <span className="text-yellow-600 font-bold">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Delete task action */}
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteTask(t._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Activity Logs Section */}
        {activeTab === "logs" && (
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              {/* Logs table header */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Action</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Task Ref</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>

              {/* Logs table body */}
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-b">
                    <td className="p-4 font-bold text-blue-600">
                      {log.action}
                    </td>
                    <td className="p-4">
                      {log.user?.name || "Unknown User"} ({log.user?.email})
                    </td>
                    <td className="p-4">{log.taskId?.title || "N/A"}</td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}

                {/* Empty state */}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No activity logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;