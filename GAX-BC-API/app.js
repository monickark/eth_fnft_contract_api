/* Copyright (C) 2022 Global Art Exchange, LLC ("GAX"). All Rights Reserved.
 * You may not use, distribute and modify this code without a license;
  To obtain a license write to legal@gax.llc */
  'use strict';

const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan'); 
const express =   require("express");
const routes = require('./routes');
require('winston-daily-rotate-file');
require('dotenv').config();

const logger = require('./utilities/logger');
  
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.listen( process.env.PORT || 4000, () => {
  logger.info('Server running on port : ' + process.env.PORT);
});

/* Copyright (C) 2022 Global Art Exchange, LLC ("GAX"). All Rights Reserved.
 * You may not use, distribute and modify this code without a license;
  To obtain a license write to legal@gax.llc */