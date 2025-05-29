const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student')

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hemantsonihs2004:<password>@backenddb.zye6j2j.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backenddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  app.get('/', (req, res) => {
  res.send('Hello from Node API Server');
});


app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const newStudent = new Student(req.body);
  const saved = await newStudent.save();
  res.json(saved);
});

app.put('/students/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

app.listen(4000, () => {
  console.log('Backend running on port 4000');
});
