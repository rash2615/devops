function Team() {
  const teamMembers = [
    {
      name: 'Jean Dupont',
      role: 'Chef de projet',
      email: 'jean.dupont@example.com',
      tasks: 12,
      completed: 8,
      avatar: 'https://ui-avatars.com/api/?name=Jean+Dupont&background=random'
    },
    {
      name: 'Marie Martin',
      role: 'Développeuse Frontend',
      email: 'marie.martin@example.com',
      tasks: 15,
      completed: 10,
      avatar: 'https://ui-avatars.com/api/?name=Marie+Martin&background=random'
    },
    {
      name: 'Pierre Durand',
      role: 'Développeur Backend',
      email: 'pierre.durand@example.com',
      tasks: 10,
      completed: 7,
      avatar: 'https://ui-avatars.com/api/?name=Pierre+Durand&background=random'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Équipe</h2>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Ajouter un membre
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm font-medium text-gray-500">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team; 