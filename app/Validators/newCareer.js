'use strict'

const Base = require('./base');

class newCareer extends Base {
  get rules () {
    return {
      name: 'unique'
    }
  }
  get messages () {
    return {
      unique: 'Hey homie, that {{ field }} already exists'
    }
  }
}

module.exports = newCareer
