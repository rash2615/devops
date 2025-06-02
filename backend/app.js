const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Task = require('./models/Task');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/todolist';
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt';

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

// Routes d'authentification
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Créer le nouvel utilisateur
    const user = new User({ username, email, password });
    await user.save();

    // Générer le token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // Générer le token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ user: { id: user._id, username: user.username, email }, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routes des tâches (protégées par auth)
app.get('/api/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignee', 'username email')
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/tasks', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id
    });
    const newTask = await task.save();
    await newTask.populate('assignee', 'username email');
    await newTask.populate('createdBy', 'username email');
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Vérifier si l'utilisateur est le créateur ou l'assigné
    if (task.createdBy.toString() !== req.user._id.toString() && 
        task.assignee?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();
    await updatedTask.populate('assignee', 'username email');
    await updatedTask.populate('createdBy', 'username email');
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Vérifier si l'utilisateur est le créateur
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    await task.deleteOne();
    res.json({ message: 'Tâche supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour obtenir le profil de l'utilisateur
app.get('/api/users/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 