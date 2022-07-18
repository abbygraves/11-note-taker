const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));  // ⬅︎ parse incoming string or array data
app.use(express.json());  // ⬅︎ parse incoming JSON data
app.use(express.static('./public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);




// Start the server on the port
app.listen(PORT, () => {
  console.log(`API server now running https://localhost:${PORT}!`);
});

