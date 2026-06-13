'use strict';

const config = require('config');
const mongoose = require('mongoose');

const path = require('path');
const fs = require('fs');

class Core {


  /**
   * Recursively loads all files ending in '.route.js'
   * and passes each loaded module to a callback
   */
  loadRouteModules(dirs, callback) {
    const directories = Array.isArray(dirs) ? dirs : [dirs];
    directories.forEach((dir) => {
      const directory = path.resolve(dir);
      if (!fs.existsSync(directory)) {
        throw new Error(`Directory '${directory}' not found. Check 'endpoint' parameter in app.js`);
      }
      const walk = (currentDir) => {
        fs.readdirSync(currentDir).forEach((file) => {
          const filePath = path.join(currentDir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            walk(filePath); // recurse
          } else if (/\.route\.js$/.test(file)) {
            const mod = require(filePath);
            callback(mod, filePath);
          }
        });
      };
      walk(directory);
    });
  }

  // Loads all .js files from a directory and executes a callback on each.
  loadJSModules(dir, callback) {
      console.log(dir);
    const directory = path.resolve(dir);
    if (!fs.existsSync(directory)) {
      throw new Error (`Directory '${directory}' does not exists!`);
    }
    fs.readdirSync(directory).forEach((file) => {
      if (file.endsWith('.js')) {
        const filePath = path.join(directory, file);
        const mod = require(filePath);
        callback(mod, file);
      }
    });
  }

  // encode a date(Unix Epoch Time) into more readable format
  // YYYY-MM-DD (ISO8601 Extended Format).
  encodeISO8601ExtendedFormat(date) {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date)
  }

  // decode a date from extended format into Unix Epoch Time.
  decodeISOExtendedFormat(date) { }

  /**
   * Encode a string into base64
   */
  encode64(text) {
    let encoded = Buffer.from(text)
    return encoded.toString('base64');
  }

  /**
   * Decode a string from base64
   */
  decode64(enctext){
    let decoded = new Buffer.from(enctext, 'base64');
    return decoded.toString();
  }
}

module.exports = new Core();

