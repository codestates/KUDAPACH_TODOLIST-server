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
        } else {
          delete data.dataValues.password;
          res.status(200).json({ data: data.dataValues });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  edit: async (req, res) => {
    const { id, username, mobile, password } = req.body;
    user
      .update({ username, mobile, password }, { where: { id } })
      .then((data) => {
        const { id, username, mobile } = data;
        res.status(200).json({
          data: {
            id,
            username,
            mobile,
          },
        });
      })
      .catch((err) => res.status(500).send(err));
  },
};
