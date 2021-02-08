const { user } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenfunction');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    await user
      .findOne({
        where: {
          email,
          password,
        },
      })
      .then((data) => {
        if (!data) {
          return res.status(401).send('Invalid email or wrong password');
        } else {
          delete data.dataValues.password;
          delete data.dataValues.createdAt;
          delete data.dataValues.updatedAt;

          const accessToken = generateAccessToken(data.dataValues);
          const refreshToken = generateRefreshToken(data.dataValues);

          sendRefreshToken(res, refreshToken);
          sendAccessToken(res, accessToken, 'Sign in successful!');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
