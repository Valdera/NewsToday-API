const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({
  path: './config.env'
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
