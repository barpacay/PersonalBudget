const express = require('express');
const mongoose = require('mongoose');
const app = express();



mongoose.connect('mongodb://0.0.0.0:27017/budget', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/fetch', async (req, res) => {
  const entries = await BudgetEntry.find({});
  res.json(entries);
});

app.post('/add', async (req, res) => {
  const { title, relatedValue, color } = req.body;
  const newEntry = new BudgetEntry({ title, relatedValue, color });
  await newEntry.save();
  res.status(201).json(newEntry);
});

app.use('/', express.static('public'));

const budgetEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  relatedValue: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validate: /^#([A-Fa-f0-9]{6})$/,
  },
});

const BudgetEntry = mongoose.model('BudgetEntry', budgetEntrySchema);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});





