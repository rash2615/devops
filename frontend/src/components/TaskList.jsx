function TaskList({ tasks, loading, error }) {
  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4 mt-8">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              <p className="mt-1 text-gray-600">{task.description}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList; 