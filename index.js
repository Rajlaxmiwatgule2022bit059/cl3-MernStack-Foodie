const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const createUser = require('./Routes/CreateUser');
const displayData = require('./Routes/DisplayData'); 

const cors = require('cors');


app.use(cors({ origin: 'http://localhost:3001' })); 


mongoDB();

app.use(express.json());


app.use('/api', createUser);
app.use('/api', displayData); 
app.use('/api', require('./Routes/OrderData'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
