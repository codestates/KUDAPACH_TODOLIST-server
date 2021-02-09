const {
  user,
  users_groups,
  group_info,
  group_todocard,
} = require('../../models');

module.exports = {
  post: async (req, res) => {
    const id = req.cookies.id;
    const groupid = await users_groups.findOne({ where: { id } });
    const groupname = await group_info.findOne({
      where: { id: groupid.dataValues.id },
    });
    const groupCards = await group_todocard.findAll({
      where: { groupid: groupname.dataValues.id },
      attributes: ['id', 'text', 'color'],
    });
    const userIds = await users_groups.findAll({
      where: { groupid: groupid.dataValues.id },
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
