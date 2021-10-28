const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
require('dotenv').config();

const { instanceRouter } = require('./src/routes/instanceRoute');
const { keycloakRouter } = require('./src/routes/keycloakRoute');
const { securityGroupRouter } = require('./src/routes/securityGroupRoute');
const { adminRouter } = require('./src/routes/adminRoute');

const MONGO_URI = 'mongodb://localhost:27017/awsdb';
mongoose.Promise = global.Promise;

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // mongoose.set('debug', true);
    console.log('mongodb is connected');

    app.use(express.json()); // body-parser
    app.use(cors());

    // setting routers
    app.use('/data', instanceRouter);
    app.use('/keycloak', keycloakRouter);
    app.use('/security-group', securityGroupRouter);
    app.use('/admin', adminRouter);

    app.listen(5000, () => console.log('server is running on 5000 port'));
  } catch (err) {
    console.log(err);
  }
};

server();
