const request = require('request');

exports.today = async (req, res, next) => {
  request('http://today.line.me/id/portaljson', (error, response, body) => {
    if (error) {
      // If there is an error, tell the user
      res.send('An erorr occured');
    }
    // Otherwise do something with the API data and send a response
    else {
      res.send(body);
    }
  });
};
