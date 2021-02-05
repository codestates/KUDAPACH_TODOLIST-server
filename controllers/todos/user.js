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
    if (!password) {
      await user.update({ username, mobile }, { where: { id } });
    } else {
      await user.update({ username, mobile, password }, { where: { id } });
    }

    await user
      .findOne({ where: { id } })
      .then(() => {
        res.status(200).send('Succesfully updated');
      })
      .catch((err) => res.status(500).send(err));
  },
};
