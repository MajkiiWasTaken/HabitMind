require('dotenv').config();
console.log('Connecting to MongoDB at:', process.env.MONGO_URI); // Debugging log

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
//app.use('/api/tasks', require('./routes/taskRoutes'));
//app.use('/api/ai', require('./routes/aiRoutes'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB')) // Debugging log
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));
