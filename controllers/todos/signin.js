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
        }
        delete data.password;
        const accessToken = generateAccessToken(data);
        const refreshToken = generateRefreshToken(data);

        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken, 'Sign in successful!');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
