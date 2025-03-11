const express = require('express');
const cors = require('cors');
require('dotenv').config();

const askRoute = require('./routes/ask');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ask', askRoute);

app.listen(3000, () => {
  console.log('AI Backend running on port 3000');
});