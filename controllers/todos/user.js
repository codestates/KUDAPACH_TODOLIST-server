const { user } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const id = req.cookies.id;
    user
      .findOne({ where: id })
      .then((data) => {
        if (!data) {
          res.status(401).send('cookie err');
        } else {
          delete data.dataValues.password;
          res.status(200).json({ data: data.dataValues });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  edit: async (req, res) => {
    const { username, mobile, password } = req.body;
    if (!password) {
      await user.update(
        { username, mobile },
        { where: { id: req.cookies.id } },
      );
    } else {
      await user.update(
        { username, mobile, password },
        { where: { id: req.cookies.id } },
      );
    }
    await user
      .findOne({ where: { id: req.cookies.id } })
      .then(() => {
        res.status(200).send('Succesfully updated');
      })
      .catch((err) => res.status(500).send(err));
  },
};
