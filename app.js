const express = require('express');
const app = express();
const routes = require('./routers')
const PORT = 3000

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);


// app.listen(PORT, () => {
//     console.log("App running on port: ", PORT);
//   })

module.exports = app