const { grouptodocard, todocard, user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = {
  get: async (req, res) => {
    const token = isAuthorized(req);
    if (token === null) {
      res.status(500).send('Is not authorize');
    } else {
      const { email } = token;
      await todocard
        .fideAll({
          include: [{ model: user, where: { email } }],
        })
        .then((data) => res.status(200).send({ data: data.dataValues }))
        .catch((err) => res.status(500).send(err));
    }
  },
  edit: async (req, res) => {
    const { id, trash, text, color, groupid } = req.body;
    //* id => todocard's id, trash => boolean, group => grouptodocard.id
    //* text => changed text, color => changed color
    if (groupid === null) {
      // groupid === null 일때
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
    } else {
      // groupid 가 받아질때
      if (trash) {
        await grouptodocard.destroy({
          where: { id: groupid },
        });
      } else {
        await grouptodocard.update({ text, color }, { where: { id: groupid } });
        await todocard
          .findOne({ where: { id: groupid } })
          .then((data) => res.send({ data: data.dataValues }));
      }
    }
  },
  calendar: {},
};
