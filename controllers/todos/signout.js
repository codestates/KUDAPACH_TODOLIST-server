module.exports = {
  post: (req, res) => {
    res.clearCookie('id');
    res.send('Successfully signed out');
  },
};
