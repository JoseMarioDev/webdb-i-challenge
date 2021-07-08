const server = require('./server.js');
const chalk = require('chalk');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.blue.bold(`\n*** Listening on port ${PORT}... ***\n`));
});
