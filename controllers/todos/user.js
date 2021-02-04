const { user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = {
  get: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(401).send('invalid access token');
    }
    const { email } = accessTokenData;
    user
      .findOne({ where: email })
      .then((data) => {
        if (!data) {
          res.status(401).send('access token has been tempered');
        }

        const { email, username, mobile } = data;
        res.status(200).json({
          data: {
            email,
            username,
            mobile,
          },
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
