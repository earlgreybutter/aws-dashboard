const { Router } = require('express');
const keycloakRouter = Router();
const KcAdminClient = require('keycloak-admin').default;

const kcAdminClient = new KcAdminClient();

keycloakRouter.post('/login', async function (req, res) {
  // authorize with username / password
  await kcAdminClient.auth({
    username: req.body.username, // "purpleduck"
    password: req.body.password, // "purpleduck"
    grantType: 'password',
    clientId: 'admin-cli',
  });

  // console.log(req);
  // console.log(res);

  // List all users
  const users = await kcAdminClient.users.find();
  console.log(users);

  // response 로 뭘줄까.
  res.send(users);
});

keycloakRouter.get('/', async function () {
  // authorize with username / password
  await kcAdminClient.auth({
    username: 'purpleduck',
    password: 'purpleduck',
    grantType: 'password',
    clientId: 'admin-cli',
  });

  // List all users
  const users = await kcAdminClient.users.find();

  console.log(users);

  // Override client connfiguration for all further requests:
  kcAdminClient.setConfig({
    realmName: 'starbucks',
  });

  // This operation will now be performed in 'starbucks' if the user has access.
  const groups = await kcAdminClient.groups.find();

  console.log(groups);

  const users1 = await kcAdminClient.users.find();

  console.log(users1);

  //   await this.kcAdminClient.users.create({
  //     realm: "coffeebin",
  //     username: "username",
  //     email: "user@example.com",
  //   });
});

keycloakRouter.get('/userlist', async function () {
  // List all users
  const users = await kcAdminClient.users.find();
  console.log(users);
});

module.exports = {
  keycloakRouter,
};
