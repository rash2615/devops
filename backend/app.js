const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/todolist';

app.use(cors());
app.use(express.json());

// Ajouter des données de test
const createInitialTasks = async () => {
  try {
    const count = await Task.countDocuments();
    if (count === 0) {
      await Task.insertMany([
        {
          title: 'Refonte du site web',
          description: 'Moderniser l\'interface utilisateur et améliorer les performances',
          status: 'in-progress',
          priority: 'high',
          assignee: 'Jean Dupont',
          dueDate: new Date('2024-06-15')
        },
        {
          title: 'Mise à jour de la documentation',
          description: 'Mettre à jour la documentation technique du projet',
          status: 'pending',
          priority: 'medium',
          assignee: 'Marie Martin',
          dueDate: new Date('2024-06-10')
        },
        {
          title: 'Tests d\'intégration',
          description: 'Écrire et exécuter les tests d\'intégration pour les nouvelles fonctionnalités',
          status: 'completed',
          priority: 'high',
          assignee: 'Pierre Durand',
          dueDate: new Date('2024-06-05')
        }
      ]);
      console.log('Données de test créées avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de la création des données de test:', error);
  }
};

// Connexion à MongoDB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connecté à MongoDB');
    createInitialTasks();
  })
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes API
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'pending'
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    
    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    
    await task.deleteOne();
    res.json({ message: 'Tâche supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 