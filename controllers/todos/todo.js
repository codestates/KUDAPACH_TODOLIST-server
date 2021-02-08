const { user, todocard } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { email } = req.body;
    await todocard
      .fideAll({
        include: [{ model: user, where: { email } }],
      })
      .then((data) => res.status(200).send({ data: data.dataValues }))
      .catch((err) => res.status(500).send(err).send('Is not authorize'));
  },
  edit: async (req, res) => {
    const { id, trash, text, color } = req.body;
    //? id => todocard's id, trash => boolean,
    //? text => changed text, color => changed color
    if (trash) {
      await todocard.destroy({
        where: { id },
      });
    } else {
      await todocard.update({ text, color }, { where: { id } });
      await todocard
        .findOne({ where: { id } })
        .then((data) => res.send({ data: data.dataValues }));
    }
  },
};
//   calendar: async (req, res) => {
//     const { date } = req.body;
//     await todocard.findAll({
//       where:
//     });
//   },
// };

/*
select * from TABLE_NAME where DATE(TIMESTAMP_COLUMN) = DATE('2019-01-30')


예를 들어 ProgressStatus가 000이고, 날짜/시간이  '2019-11-12 11:59'이상이고 '2019-11-13 11:59' 미만일때의 정보를 출력한다면?
where: sequelize.or(
        {
          CompareStartTimes: {
            [sequelize.Op.gte]:
              param.popupStartDate + ' ' + param.popupStartTime,
          },
        },
        {
          CompareEndTimes: {
            [sequelize.Op.lte]: param.popupEndDate + ' ' + param.popupEndTime,
          },
        },
      ),
*/
