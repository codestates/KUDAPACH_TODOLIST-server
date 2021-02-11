module.exports = {
  post: async (req, res) => {
    res.clearCookie('id');
    res.status(200).send('Successfully signed out');
  },
};
