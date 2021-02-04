const { user } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { email, password, username, mobile } = req.body;

    user
      .findOrCreate({
        where: { email },
        defaults: {
          password,
          username,
          mobile,
        },
      })
      .then(([result, created]) => {
        const { email, username, mobile } = result;
        if (!created) {
          res.status(409).send('Duplicate email exists');
        } else {
          res.status(200).json({
            data: {
              email,
              username,
              mobile,
            },
          });
        }
      })
      .catch((err) => res.status(500).send(err));
  },
};
