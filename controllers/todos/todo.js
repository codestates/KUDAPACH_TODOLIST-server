const { user, todocard } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  get: async (req, res) => {
    const { email } = req.body;
    await user
      .findOne({
        where: { email },
      })
      .then((data) =>
        todocard
          .findAll({ where: { userid: data.id } })
          .then((data) => res.status(200).send({ data: data }))
          .catch((err) => res.status(500).send(err)),
      );
  },

  edit: async (req, res) => {
    const { id, trash, text, color } = req.body;
    //? id => todocard's id, trash => boolean,
    //? text => changed text, color => changed color
    if (trash) {
      await todocard
        .destroy({
          where: { id },
        })
        .then(res.send('success'));
    } else {
      await todocard.update({ text, color }, { where: { id } });
      await todocard
        .findOne({ where: { id } }, { attributes: ['id', 'text', 'color'] })
        .then((data) => res.send({ data: data.dataValues }));
    }
  },

  calendar: async (req, res) => {
    const { date } = req.body;
    // date form `2020-02-02`
    await todocard
      .findAll({
        where: {
          updatedAt: {
            [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
          },
        },
      })
      .then((data) => res.send(data));
  },
};
