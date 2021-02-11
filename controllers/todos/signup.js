const { user } = require('../../models');
const SHA256 = require('sha256');

module.exports = {
  post: async (req, res) => {
    const { email, username, mobile } = req.body;
    let { password } = req.body;
    password = SHA256(password);

    await user
      .findOrCreate({
        where: { email },
        defaults: {
          password,
          username,
          mobile,
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
