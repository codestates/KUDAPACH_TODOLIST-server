const { user } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const token = req.cookies.refreshToken;
  const data = jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).json({
        data: null,
      });
    } else {
      return decoded;
    }
  });
  const { id, email, username, password } = data;
  const userInfo = await user.findOne({
    where: { id: id },
  });
  if (!userInfo) {
    res.status(400).json({ data: null });
  } else {
    const accessToken = jwt.sign(
      { id, email, username, password },
      process.env.ACCESS_SECRET,
      { expiresIn: '1h' },
    );
    res.status(200).json({
      data: {
        accessToken,
        userInfo: { id, email, username, password },
      },
    });
  }
};
