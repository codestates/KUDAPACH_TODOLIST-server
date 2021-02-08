// module.exports = {
//   post: async (req, res) => {
//     const { email, password, username, mobile } = req.body;
//     user
//       .findOrCreate({
//         where: { email },
//         defaults: {
//           password,
//           username,
//           mobile,
//         },
//       })
//       .then((result) => {
//         if (!result[1]) {
//           res.status(409).send('Duplicate email exists');
//         } else {
//           res.status(200).send('Succesfully signed up');
//         }
//       })
//       .catch((err) => res.status(500).send(err));
//   },
// };
