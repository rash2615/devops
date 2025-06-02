function TaskList({ tasks, onUpdate, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
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
              <select
                value={task.status}
                onChange={(e) => onUpdate(task._id, { status: e.target.value })}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}
              >
                <option value="pending">En attente</option>
                <option value="in-progress">En cours</option>
                <option value="completed">Terminé</option>
              </select>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList; 