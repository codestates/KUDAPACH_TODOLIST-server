const { user, todocard } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  get: async (req, res) => {
    const id = req.cookies.id;

    await user
      .findOne({
        where: { id },
      })
      .then((data) =>
        todocard.findAll({ where: { userid: data.dataValues.id } }),
      )
      .then((data) => res.status(200).json({ data: data.dataValues }))
      .catch((err) => res.status(500).send(err));
  },

  create: async (req, res) => {
    const id = req.cookies.id;
    const { color } = req.body;

    await user.findOne({ where: { id }, attributes: ['id'] }).then((data) =>
      todocard.create({
        userid: data.dataValues.id,
        color,
      }),
    );

    res.status(200).send('succesfully created');
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
        .then(res.status(200).send('success'));
    } else {
      await todocard.update({ text, color }, { where: { id } });
      await todocard
        .findOne({ where: { id } }, { attributes: ['id', 'text', 'color'] })
        .then((data) => res.status(200).send({ data: data.dataValues }));
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
      .then((data) => res.status(200).send(data));
  },
};
