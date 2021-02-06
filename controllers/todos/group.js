const { todogroup, users_groups, grouptodocard } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = {
  get: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(401).send('invalid access token');
    }
    const { id, group } = accessTokenData;
    // N : 1로 하면, 배열 안에 값이 들어간다
    if (group) {
      users_groups
        .findOne({
          where: { userid: id },
          // 먼저 조인 테이블에서 해당 userid를 뽑아내어, 그 유저가 포함된 groupid를 찾아준다
        })
        .then((data) => {
          // 1 : N인 users_groups과 grouptodocards에서 groupid에 속해진 todocards를 배열로 가지고 온다
          // N : 1인 users_groups과 todogroups에서 groupname으로 칭하며 groupname을 찾아준다
          grouptodocard.findAll({
            include: [
              {
                model: users_groups,
                as: 'data',
                where: { groupid: data.groupid },
                include: [
                  {
                    model: todogroup,
                    as: 'groupname',
                    where: { id: data.groupid },
                  },
                ],
              },
            ],
          });
        })
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(400).send('User does not part of any groups');
    }
  },
};
