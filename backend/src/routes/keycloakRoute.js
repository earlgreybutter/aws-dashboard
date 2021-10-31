const { Router } = require('express');
const keycloakRouter = Router();
const KcAdminClient = require('keycloak-admin').default;

const kcAdminClient = new KcAdminClient();

keycloakRouter.post('/login', async function (req, res) {
  try {
    // authorize with username / password
    await kcAdminClient.auth({
      username: req.body.username, // "purpleduck"
      password: req.body.password, // "purpleduck"
      grantType: 'password',
      clientId: 'admin-cli',
    });

    // List all users
    const users = await kcAdminClient.users.find();
    console.log(users);
    res.send('Success');
  } catch (err) {
    res.send('Fail');
  }
});

module.exports = {
  keycloakRouter,
};
