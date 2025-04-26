import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [taskInputs, setTaskInputs] = useState({});
  const [tasks, setTasks] = useState({});
  const [editingTask, setEditingTask] = useState(null); // Track task being edited
  const [editInputs, setEditInputs] = useState({}); // Inputs for editing tasks
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(res.data)
      setProjects(res.data);

      const taskData = {};
      for (const project of res.data) {
        const taskRes = await axios.get(`${baseUrl}/api/tasks/${project._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        taskData[project._id] = taskRes.data;
      }
      setTasks(taskData);
    } catch (err) {
      console.error('Error fetching projects or tasks:', err);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchProjects();
  }, [user]);

  const handleCreate = async () => {
    setError('');
    if (!title.trim()) {
      setError('Project title cannot be empty.');
      return;
    }
    try {
      await axios.post(
        `${baseUrl}/api/projects`,
        { name: title },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTitle('');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create project');
    }
  };

  const handleTaskChange = (projectId, field, value) => {
    setTaskInputs((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [field]: value,
      },
    }));
  };

  const handleAddTask = async (projectId) => {
    const { title, description } = taskInputs[projectId] || {};
    if (!title?.trim() || !description?.trim()) {
      setError('Task title and description cannot be empty.');
      return;
    }
    try {
      await axios.post(
        `${baseUrl}/api/tasks`,
        { projectId, title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTaskInputs((prev) => ({ ...prev, [projectId]: {} }));
      fetchProjects();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchProjects();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      await axios.put(
        `${baseUrl}/api/tasks/${task._id}`,
        { status: task.status === 'completed' ? 'pending' : 'completed' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchProjects();
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task._id);
    setEditInputs({ title: task.title, description: task.description });
  };

  const handleUpdateTask = async (taskId) => {
    try {
      await axios.put(
        `${baseUrl}/api/tasks/${taskId}`,
        editInputs,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setEditingTask(null);
      fetchProjects();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 ">Welcome, {user.name}!</h2>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Your Projects</h3>
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="New project title"
            className="input border text-gray-50 border-gray-300 rounded-lg px-4 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <ul className="space-y-6">
          {projects.map((project) => (
            <li
              key={project._id}
              className="bg-gray-100 dark:bg-zinc-700 p-6 rounded-xl shadow"
            >
              <strong className="text-lg font-bold text-gray-200">{project.name}</strong>

              <div className="mt-4">
                
                <input
                  type="text"
                  placeholder="Task title"
                  className="input mb-2 text-amber-50 w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={taskInputs[project._id]?.title || ''}
                  onChange={(e) => handleTaskChange(project._id, 'title', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Task description"
                  className="input mb-2 text-amber-50 w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={taskInputs[project._id]?.description || ''}
                  onChange={(e) => handleTaskChange(project._id, 'description', e.target.value)}
                />
                <button
                  onClick={() => handleAddTask(project._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Add Task
                </button>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-gray-200">Tasks:</h4>
                <ul className="space-y-3">
                  {(tasks[project._id] || []).map((task) => (
                    <li
                      key={task._id}
                      className={`bg-white dark:bg-zinc-600 p-4 rounded-md flex justify-between items-center ${
                        task.status === 'completed' ? 'opacity-50' : ''
                      }`}
                    >
                      {editingTask === task._id ? (
                        <div className="flex flex-col gap-2 w-full">
                          <input
                            type="text"
                            className="input border border-gray-300 rounded-lg px-4 py-2"
                            value={editInputs.title}
                            onChange={(e) =>
                              setEditInputs((prev) => ({ ...prev, title: e.target.value }))
                            }
                          />
                          <input
                            type="text"
                            className="input border border-gray-300 rounded-lg px-4 py-2"
                            value={editInputs.description}
                            onChange={(e) =>
                              setEditInputs((prev) => ({ ...prev, description: e.target.value }))
                            }
                          />
                          <button
                            onClick={() => handleUpdateTask(task._id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-gray-200">{task.title}</p>
                          <p className="text-sm text-gray-200">{task.description}</p>
                          <p className="text-xs text-green-500">{task.status}</p>
                        </div>
                      )}
                      <div className="flex gap-3 items-center">
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          onChange={() => handleToggleStatus(task)}
                          className="cursor-pointer"
                        />
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-sm text-yellow-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;