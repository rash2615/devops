import { useState } from 'react';

function Calendar() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const renderCalendarDays = () => {
    const days = [];
    const tasks = [
      { date: 5, title: 'Réunion équipe', time: '10:00' },
      { date: 12, title: 'Présentation client', time: '14:30' },
      { date: 20, title: 'Deadline projet', time: '18:00' }
    ];

    // Ajouter les jours vides au début
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = tasks.filter(task => task.date === day);
      const isSelected = selectedDate.getDate() === day;

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
            isSelected ? 'bg-indigo-50' : ''
          }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div className="font-medium text-gray-900">{day}</div>
          <div className="mt-1 space-y-1">
            {dayTasks.map((task, index) => (
              <div
                key={index}
                className="text-xs bg-indigo-100 text-indigo-800 rounded px-1 py-0.5 truncate"
              >
                {task.time} - {task.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          {currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Aujourd'hui
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            &lt;
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-900">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>

      {selectedDate && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 text-sm text-gray-500">10:00</div>
              <div className="flex-1 bg-indigo-50 rounded-lg p-3">
                <h4 className="font-medium text-indigo-900">Réunion équipe</h4>
                <p className="text-sm text-indigo-700">Réunion hebdomadaire de l'équipe</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 text-sm text-gray-500">14:30</div>
              <div className="flex-1 bg-green-50 rounded-lg p-3">
                <h4 className="font-medium text-green-900">Présentation client</h4>
                <p className="text-sm text-green-700">Présentation du projet au client</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar; 