const { todocard, user } = require('../../models');
const { isAuthorized } = require('../tokenfunction');

module.exports = {
  get: async (req, res) => {
    const data = isAuthorized(req);
    if (data === null) {
      res.status(500).send('Is not authorize');
    } else {
      const { email } = data;
      await todocard
        .fideAll({
          include: [{ model: user, where: { email } }],
        })
        .then((data) => res.status(200).send({ data }))
        .catch((err) => res.status(500).send(err));
    }
  },
  edit: {},
  calendar: {},
};
