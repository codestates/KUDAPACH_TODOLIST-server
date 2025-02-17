const { user } = require('../../models');
const SHA256 = require('sha256');

module.exports = {
  get: async (req, res) => {
    const id = req.cookies.id;

    await user
      .findOne({ where: { id } })
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
    const { username, mobile, currentPassword, password } = req.body;

    if (!currentPassword) {
      await user
        .update({ username, mobile }, { where: { id: req.cookies.id } })
        .then(() => res.status(200).send('Succesfully updated'))
        .catch((err) => res.status(500).send(err));
    } else {
      const oldPassword = SHA256(currentPassword);
      const newPassword = SHA256(password);
      await user.update(
        { username, mobile },
        { where: { id: req.cookies.id } },
      );

      await user
        .findOne({ where: { id: req.cookies.id } })
        .then(async (data) => {
          if (data.dataValues.password !== oldPassword) {
            res.status(409).send('wrong password');
          } else {
            await user
              .update(
                { username, mobile, password: newPassword },
                { where: { id: req.cookies.id } },
              )
              .then(() => res.status(200).send('Succesfully updated'))
              .catch((err) => res.status(500).send(err));
          }
        });
    }
  },
};
