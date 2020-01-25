const server = require('./app/server');
const PORT = process.env.PORT || 3000;

server.listen(
  PORT,
  () => console.log(`Server is live at localhost:${PORT}`)
);
