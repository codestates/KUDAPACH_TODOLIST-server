const { user, users_groups, group_info } = require('../../models');

module.exports = {
  create: async (req, res) => {
    const { emails, groupname } = req.body;

    const userList = await Promise.all(
      emails.map((email) => user.findOne({ where: { email } })),
    ).then((data) =>
      data.map((email) => {
        if (email === null) res.status(409).send('email does not exist');
        else return email;
      }),
    );

    await Promise.all(
      emails.map((email) => user.update({ group: true }, { where: { email } })),
    );

    await group_info
      .findOrCreate({ where: { groupname: groupname } })
      .then(async (result) => {
        if (!result[1]) res.status(409).send('Duplicate group name exists');
        else {
          await Promise.all(
            userList.map((user) =>
              users_groups.create({
                userid: user.dataValues.id,
                groupid: result[0].dataValues.id,
              }),
            ),
          );
          res.status(200).send('succesfully created');
        }
      })
      .catch((err) => res.status(500).send(err));
  },

  edit: (req, res) => {
    res.send('ok');
  },
};
