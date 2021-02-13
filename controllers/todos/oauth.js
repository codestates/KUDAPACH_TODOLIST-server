const { user, users_groups, group_info } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { email, username } = req.body;

    await user
      .findOrCreate({
        where: { email },
        defaults: {
          password: 'null',
          username,
          mobile: ' ',
        },
      })
      .then((result) => {
        delete result[0].password;
        delete result[0].createdAt;
        delete result[0].updatedAt;
        users_groups
          .findAll({
            where: { userid: result[0].id },
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
              .cookie('id', result[0].id, {
                // domain: ['https://kudapach.com', 'https://www.kudapach.com'],
                //  path: '/',
                sameSite: 'none',
                httpOnly: true,
                secure: true,
              })
              .json({
                data: result[0],
                groups: dat,
                groupnames: groupname,
                oauth: true,
              });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
