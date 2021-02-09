const { user } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { email, username } = req.body;

    user
      .findOrCreate({
        where: { email },
        defaults: {
          password: 'null',
          username,
          mobile: 'null',
        },
      })
      .then((result) => {
        if (!result[1]) {
          res.status(409).send('Duplicate email exists');
        } else {
          res.status(200).send('Succesfully signed up');
        }
      })
      .catch((err) => res.status(500).send(err));
  },
};
