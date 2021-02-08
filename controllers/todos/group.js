const {
  user,
  users_groups,
  group_info,
  group_todocard,
} = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { groupid } = req.body;
    const groupname = await group_info.findOne({ where: { id: groupid } });
    const groupCards = await group_todocard.findAll({
      where: { groupid: groupname.dataValues.id },
      attributes: ['id', 'text', 'color'],
    });
    const userIds = await users_groups.findAll({
      where: { groupid: groupid },
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
};
