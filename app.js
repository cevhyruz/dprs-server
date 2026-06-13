'use strict'

const config = require('config');

const server = require('./src/core/server.class');
const express = require('express');

const Server = new server(express, {
  endpoints: ['src/features'],
  // port: config.get('server.port') || 3000,
  port: 3000,
  // host: config.get('server.host'),
  apiBasePath: config.get('server.apiBaseRoot'),
  // v2: config.get('server.apiV2'),
});
