const { user } = require('../../models');

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
          // 그룹 리스트까지도 보내줘야함
          res
            .cookie('id', data.dataValues.id, {
              domain: ['https://kudapach.com', 'https://www.kudapach.com'],
              path: '/',
              sameSite: 'none',
              httpOnly: true,
              secure: true,
            })
            .send({ data: data, message: 'Sign in successful!' });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
