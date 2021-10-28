const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

require('dotenv').config();

const { instanceRouter } = require('./src/routes/instanceRoute');
const { keycloakRouter } = require('./src/routes/keycloakRoute');
const { securityGroupRouter } = require('./src/routes/securityGroupRoute');

const MONGO_URI = 'mongodb://localhost:27017/awsdb';
mongoose.Promise = global.Promise;

const server = async () => {
  try {
    // make a connection
    await mongoose.connect(MONGO_URI);
    mongoose.set('debug', true);
    console.log('mongodb is connected');

    app.use(express.json()); // body-parser

    app.use(cors());

    // 라우터 설정
    app.use('/data', instanceRouter);
    app.use('/keycloak', keycloakRouter);
    app.use('/security-group', securityGroupRouter);

    app.listen(5000, () => console.log('server is running on 5000 port'));
  } catch (err) {
    console.log(err);
  }
};

server();
