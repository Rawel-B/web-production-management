const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/factory_db')
  .then(() => console.log("Connected to MongoDB: factory_db"))
  .catch(err => console.error("Could not connect to MongoDB", err));

const MachineSchema = new mongoose.Schema({
  machineId: String,
  machineName: String,
  lastCycleCount: Number,
  status: String,
  lastSeen: Date
}, { collection: 'machines' });

const Machine = mongoose.model('Machine', MachineSchema);

app.get('/api/machines', async (req, res) => {
  const machines = await Machine.find();
  res.json(machines);
});

app.listen(5000, () => console.log('API running on port 5000'));