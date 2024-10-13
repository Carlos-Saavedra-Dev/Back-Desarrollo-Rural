const expressConfig = require('./config/expressConfig');
const express = require('express');

const app = express();
const PORT = process.env.API_PORT || 3000;

expressConfig.configureExpress(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});