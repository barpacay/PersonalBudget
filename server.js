const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use('/', express.static('public'));

mongoose.connect('mongodb://localhost:27017/budget', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(
  console, 'MongoDB connection error:'
));

const budgetItemSchema = new mongoose.Schema({
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
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  },
});

const BudgetItem = mongoose.model('BudgetItem', budgetItemSchema);


app.get('/api/budget', async (req, res) => {
    const budgetItems = await BudgetItem.find();
    res.json(budgetItems);
   
});

app.post('/api/budget', async (req, res) => {
    const newBudgetItem = new BudgetItem(req.body);
    await newBudgetItem.save();
    res.json(newBudgetItem);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






