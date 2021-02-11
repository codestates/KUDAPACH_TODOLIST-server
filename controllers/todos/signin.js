const { user, users_groups, group_info } = require('../../models');
const SHA256 = require('sha256');

module.exports = {
  post: async (req, res) => {
    const { email } = req.body;
    let { password } = req.body;
    password = SHA256(password);

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
          users_groups
            .findAll({
              where: { userid: data.dataValues.id },
              attributes: ['groupid'],
            })
            .then(async (dat) => {
              let groupname = await Promise.all(
                dat.map((el) =>
                  group_info.findOne({
                    where: { id: el.groupid },
                    attributes: ['groupname'],
                  }),
                ),
              );
              res
                .status(200)
                .cookie('id', data.dataValues.id, {
                  // domain: ['https://kudapach.com', 'https://www.kudapach.com'],
                  // path: '/',
                  sameSite: 'none',
                  httpOnly: true,
                  secure: true,
                })
                .json({
                  data: data.dataValues,
                  groups: dat,
                  groupnames: groupname,
                });
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
