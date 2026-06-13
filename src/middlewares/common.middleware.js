'use strict';

const AppError = require('../core/app-error.class');


/**
 * Check that the request body is not empty.
 * */
const hasBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError('Request body is required', 400));
  }
  next();
};

/**
 * Checks that the user has a profile object.
 * */
const hasProfile = (req, res, next) => {
  if (!req.user.profile) {
    return next(new AppError('No profile to register the action. Please complete your account first', 400));
  }
  next();
}

/**
 * Validates that required routes parameter is given.
 * */
const hasParams = (...requiredParams) => {
  return (req, res, next) => {
    for (const param of requiredParams) {
      if (!req.params[param]) {
        return next(new AppError(`Request parameter "${param}" is required`, 400));
      }
    }
    next();
  };
};


module.exports = { hasBody, hasParams, hasProfile };
