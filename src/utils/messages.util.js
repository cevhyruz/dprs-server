'use strict'

// remove me after migration!
// deprecated (in favor if ERROR)
const MESSAGES = {
  NOT_FOUND: 'No ID Found',
  PARAM_REQUIRED: 'Required parameter is missing',
  INVALID_TOKEN: 'Invalid token',
  UNAUTHORIZED: 'You do not have permission to execute this call.',
  UNAUTHENTICATED: 'You must login first to access this content.',
  SERVER_ERROR: 'Something went wrong, please try again later.',
  INVALID_URL: 'Url does\'nt exists',
  FOOBAR: (param) => `Parameter "${param}" is required.`,
  DB_CONNECTION: {
    FAILED: "Failed to connect to the database.",
    INVALID_CREDENTIALS: "Invalid login credentials for database connection.",
    HOST_UNREACHABLE: "Unable to reach the database host",
    TIMEOUT: "Database connection timed out.",
    SUCCESS: "Successfully connected to the database.",
  }
}


const TEST = {
  UNAUTHORIZED: 'You do not have permission to execute this call.',
  NOT_FOUND: 'No ID Found',
  PARAM_REQUIRED: 'Required parameter is missing',
  INVALID_TOKEN: 'Invalid token',
  UNAUTHENTICATED: 'You must login first to access this content.',
  SERVER_ERROR: 'Something went wrong, please try again later.',
  INVALID_URL: 'Url does\'nt exists',
  FOOBAR: (param) => `Parameter "${param}" is required.`,
  DB_CONNECTION: {
    FAILED: "Failed to connect to the database.",
    INVALID_CREDENTIALS: "Invalid login credentials for database connection.",
    HOST_UNREACHABLE: "Unable to reach the database host",
    TIMEOUT: "Database connection timed out.",
    SUCCESS: "Successfully connected to the database.",
  }
}

const HTTP = {
  // status: 'success'
  // 2xx Success,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  // 3xx Redirection,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  // status: 'fail'
  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNATHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,

  // status: 'error'
  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
}

module.exports = { MESSAGES, HTTP };

