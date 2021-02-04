const { users } = require('../../models');
module.exports = {
  post: async (req, res) => {
    let userInfo = await users.findOne({
      where: { email: req.body.email, password: req.body.password },
    });
    if (userInfo) {
      res
        .status(200)
        .cookie('email', userInfo.eamil, {
          domain: 'https://www.kudapach.com',
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: 'none',
        })
        .send({
          email: userInfo.email,
          username: userInfo.username,
          group: false,
        })
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(401).send('Invalid email or wrong password');
    }
  },
};
