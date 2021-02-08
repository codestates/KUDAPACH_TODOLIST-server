const {
  user,
  group_info,
  users_grouptodo,
  group_todocard,
} = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { group, email } = req.body;
    // N : 1로 하면, 배열 안에 값이 들어간다
    if (group) {
      await user
        .findOne({
          where: { email },
        })
        .then((data) => {
          // 1 : N인 users_groups과 grouptodocards에서 groupid에 속해진 todocards를 배열로 가지고 온다
          // N : 1인 users_groups과 todogroups에서 groupname으로 칭하며 groupname을 찾아준다
          users_grouptodo.findOne({
            include: [
              {
                model: group_todocard,
                as: 'data',
                where: { groupid: data.dataValues.groupid },
                include: [
                  {
                    model: group_info,
                    as: 'groupname',
                    where: { id: data.dataValues.groupid },
                  },
                ],
              },
            ],
          });
        })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send('User does not part of any groups');
    }
  },
};
