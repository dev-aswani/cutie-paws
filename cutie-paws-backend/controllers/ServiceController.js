// This controller module provides a way to fetch all services from the database and respond with the retrieved data. It acts as the backend logic to handle the request and retrieve the necessary information for viewing all services.


module.exports = {
    get: (req, res) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT *
                     FROM service;`;
        global.connection.query(query, (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(JSON.parse(JSON.stringify(result)));
        });
      });
    },
  };