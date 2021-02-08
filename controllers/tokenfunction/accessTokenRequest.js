require('dotenv').config();
var jwt = require('jsonwebtoken');
// const { isAuthorized } = require('./index');

module.exports = (req, res) => {
  const authorization = req.headers['authorization'];
  // 여기서 refreshToken 이 담겨온다.
  const token = authorization.split(' ')[1];
  const data = jwt.verify(token, process.env.ACCESS_SECRET);
  const { id, email, username, password } = data;
  const accessToken = jwt.sign(
    { id, email, username, password },
    process.env.ACCESS_SECRET,
    { expiresIn: '1h' },
  );
  try {
    res.send(accessToken);
  } catch (err) {
    res.status(409).send(`err : ${err}, message : unknown error has occurred`);
  }
};
