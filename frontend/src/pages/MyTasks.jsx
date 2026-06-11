/* eslint-disable no-unused-vars */

import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import {
  getMyTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "../services/api";

const MyTasks = () => {
  // Task list state
  const [tasks, setTasks] = useState([]);

  // Create task form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all tasks belonging to the logged-in user
  const fetchTasks = useCallback(async () => {
    try {
      const res = await getMyTasksAPI();
      setTasks(res.data.tasks || res.data);
    } catch (error) {
      console.error("Failed to fetch tasks");
    }
  }, []);

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create a new task
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await createTaskAPI({ title, description });

      // Reset form fields
      setTitle("");
      setDescription("");

      // Refresh task list
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task");
    }
  };

  // Toggle task completion status
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await updateTaskAPI(id, {
        completed: !currentStatus,
      });

      fetchTasks();
    } catch (error) {
      console.error("Failed to update task");
    }
  };

  // Delete a task after confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteTaskAPI(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>

          <p className="mt-2 text-slate-500">
            Manage and track your daily work.
          </p>
        </div>

        {/* Task Statistics */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {/* Total Tasks */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Total Tasks</p>

            <h3 className="text-3xl font-bold text-slate-900">
              {tasks.length}
            </h3>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Completed</p>

            <h3 className="text-3xl font-bold text-green-600">
              {tasks.filter((task) => task.completed).length}
            </h3>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Pending</p>

            <h3 className="text-3xl font-bold text-blue-600">
              {tasks.filter((task) => !task.completed).length}
            </h3>
          </div>
        </div>

        {/* Create Task Form */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Create New Task
          </h2>

          <form onSubmit={handleCreateTask} className="space-y-4">
            {/* Task Title */}
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            {/* Task Description */}
            <textarea
              rows="4"
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
            />

            {/* Add Task Button */}
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 text-white font-medium hover:bg-slate-800 transition cursor-pointer"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Task List Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Your Tasks</h2>

          <span className="text-sm text-slate-500">{tasks.length} tasks</span>
        </div>

        {/* Empty State */}
        {tasks.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-500">
              No tasks yet. Create your first task above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Task Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {/* Status Indicator */}
                      <div
                        className={`h-3 w-3 rounded-full ${task.completed ? "bg-green-500" : "bg-blue-500"
                          }`}
                      />

                      {/* Task Title */}
                      <h3
                        className={`font-semibold text-lg ${task.completed
                            ? "line-through text-slate-400"
                            : "text-slate-900"
                          }`}
                      >
                        {task.title}
                      </h3>
                    </div>

                    {/* Task Description */}
                    {task.description && (
                      <p className="text-slate-600">{task.description}</p>
                    )}
                  </div>

                  {/* Task Actions */}
                  <div className="flex gap-2">
                    {/* Complete / Undo Button */}
                    <button
                      onClick={() =>
                        handleToggleComplete(task._id, task.completed)
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${task.completed
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
