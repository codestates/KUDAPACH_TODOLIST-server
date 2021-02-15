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

    const userIds = await users_groups.findAll({
      where: { groupid },
      attributes: ['userid'],
    });

    const emails = await Promise.all(
      userIds.map((el) =>
        user.findOne({
          where: { id: el.dataValues.userid },
          attributes: ['email'],
        }),
      ),
    );

    res.status(200).json({
      groupname: groupname.dataValues.groupname,
      emails,
    });
  },

  create: async (req, res) => {
    const { emails, groupname } = req.body;

    await Promise.all(
      emails.map((email) =>
        user.findOne({ where: { email }, attributes: ['id'] }),
      ),
    ).then(async (data) => {
      // ? -1이면, 모든 이메일 valid, 양수가 나오면 특정 이메일이 invalid
      const indexNull = data.indexOf(null);
      if (indexNull !== -1) {
        return res.status(409).send('invalid email');
      } else {
        await Promise.all(
          data.map((el) =>
            user.increment('group', { where: { id: el.dataValues.id } }),
          ),
        );
        const groupid = await group_info.create({ groupname: groupname });

        await Promise.all(
          data.map((el) =>
            users_groups.create({
              groupid: groupid.dataValues.id,
              userid: el.dataValues.id,
            }),
          ),
        );
        res.status(200).send({ groupid: groupid.dataValues.id });
      }
    });
  },

  edit: async (req, res) => {
    const { groupid, groupDelete, groupname, emails } = req.body;
    if (groupDelete) {
      await users_groups
        .findAll({
          where: { groupid },
          attributes: ['userid'],
        })
        .then(
          async (data) =>
            await Promise.all(
              data.map((el) => {
                user.decrement('group', {
                  where: { id: el.dataValues.userid },
                });
              }),
            ),
        );

      await group_info.destroy({ where: { id: groupid } });
      await group_todocard.destroy({ where: { id: groupid } });
      await users_groups.destroy({
        where: { groupid },
        attributes: ['userid'],
      });

      res.status(200).send('succesfully deleted');
    } else {
      // userid찾아주기
      await users_groups
        .findAll({
          where: { groupid },
          attributes: ['userid'],
        })
        .then(
          // group 갯수 내려주기
          async (data) =>
            await Promise.all(
              data.map((el) => {
                user.decrement('group', {
                  where: { id: el.dataValues.userid },
                });
              }),
            ),
        );

      // 새로운 그룹 정보 저장
      const newGroupid = await group_info.create({ groupname });
      await group_todocard.update(
        { groupid: newGroupid.dataValues.id },
        { where: { groupid } },
      );

      await group_info.destroy({ where: { id: groupid } }); // 해당 관련 그룹 정보 삭제
      await users_groups.destroy({ where: { groupid } }); // 조인테이블에서도 삭제

      await Promise.all(
        emails.map((email) =>
          user.findOne({ where: { email }, attributes: ['id'] }),
        ), // 수정 된 이메일이 존재하는 지 확인
      ).then(async (data) => {
        // ? -1이면, 모든 이메일 valid, 양수가 나오면 특정 이메일이 invalid
        const indexNull = data.indexOf(null);
        if (indexNull !== -1) {
          return res.status(409).send('invalid email');
        } else {
          // 이메일 존재하면 다시 그룹 갯수 올려주기
          await Promise.all(
            data.map((el) =>
              user.increment('group', { where: { id: el.dataValues.id } }),
            ),
          );

          await Promise.all(
            // 해당 유저 정보로 조인테이블 업데이트
            data.map((el) =>
              users_groups.create({
                groupid: newGroupid.dataValues.id,
                userid: el.dataValues.id,
              }),
            ),
          );
          res.status(200).send({ groupid: newGroupid.dataValues.id });
        }
      });
    }
  },

  get: async (req, res) => {
    const id = req.cookies.id;

    await user
      .findOne({
        where: {
          id,
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
              res.status(200).json({
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
