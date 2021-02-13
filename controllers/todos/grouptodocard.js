const {
  user,
  users_groups,
  group_info,
  group_todocard,
} = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { groupid } = req.body;
    const groupname = await group_info.findOne({
      where: { id: groupid },
    });
    const groupCards = await group_todocard.findAll({
      where: { groupid },
      attributes: ['id', 'text', 'color'],
    });
    const userIds = await users_groups.findAll({
      where: { groupid },
      attributes: ['userid'],
    });
    const userList = await Promise.all(
      userIds.map((el) =>
        user.findOne({
          where: { id: el.dataValues.userid },
          attributes: ['username'],
        }),
      ),
    );

    res.status(200).json({
      groupname: groupname.dataValues.groupname,
      users: userList,
      data: groupCards,
    });
  },

  create: async (req, res) => {
    const { color, groupid } = req.body;

    await group_todocard
      .create({
        groupid,
        color,
      })
      .then(() => res.status(200).send('successfully created'))
      .catch((err) => res.status(500).send(err));
  },

  edit: async (req, res) => {
    const { id, trash, text, color } = req.body;
    if (trash) {
      await group_todocard.destroy({
        where: { id },
      });
      res.status(200).send('succesfully deleted');
    } else {
      await group_todocard.update({ text, color }, { where: { id } });
      const cards = await group_todocard.findOne({
        where: { id },
        attributes: ['id', 'text', 'color'],
      });
      res.status(200).json({ data: cards.dataValues });
    }
  },
};
